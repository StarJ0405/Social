import {getAPI} from '@/app/API/axiosAPI';

export const UserApi = getAPI();

UserApi.interceptors.request.use(
    (config) => {
        const TOKEN_TYPE = localStorage.getItem("tokenType");
        let ACCESS_TOKEN = localStorage.getItem("accessToken");
        let REFRESH_TOKEN = localStorage.getItem("refreshToken");
        config.headers['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
        config.headers['REFRESH_TOKEN'] = REFRESH_TOKEN;
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
// 토큰 유효성 검사
UserApi.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if(!originalRequest._retry)
        if (error.response.status === 401 ) {
            await refreshAccessToken();
            return UserApi(originalRequest);
        }else if (error.response.status === 403 ) {
            localStorage.clear();
            window.location.href = `/account/login`;
            return;
        }
    return Promise.reject(error);
});
// 토큰 갱신
const refreshAccessToken = async () => {
    const response = await UserApi.get(`/api/auth/refresh`);
    const TOKEN_TYPE = localStorage.getItem("tokenType");
    let ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    UserApi.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
}

/** 회원조회 API */
export const fetchUser = async () => {
    const response = await UserApi.get(`/api/user`);
    return response.data;
}
/** 회원수정 API */
export const updateUser = async (data:any) => {
    const response = await UserApi.put(`/api/user`, data);
    return response.data;
}
/** 회원탈퇴 API */
export const deleteUser = async () => {
    await UserApi.delete(`/api/user`);
}

/** 프로필 저장 */
export const saveProfile = async(formData:any) =>{
    const response = await UserApi.post('/api/file/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
}
/** 프로필 삭제 */
export const deleteProfile = async() =>{
   const response = await  UserApi.delete('/api/file/profile');
   return response.data;
}
/** 게시글 임시 이미지 저장 */
export const saveArticleTempImage = async( formData:any) => {
    const response = await UserApi.post('/api/file/temp_article',formData,{headers: {
        'Content-Type': 'multipart/form-data'
    }});
    return response.data;
}
/** 게시글 저장 */ 
interface articleProps{
    content:string;
    tags:String[];
    visibility:number;
    hideLoveAndShow:boolean;
    preventComment:boolean;
    img_url:string;
}
export const writeArticle = async(data:articleProps)=>{
    const response = await UserApi.post('/api/article/write',data);
    return response.data;
}

/** 댓글 작성 */
interface commentProps{
    article_id:number;
    comment:string;
}
export const writeComment = async(data:commentProps)=>{
    const response = await UserApi.post('/api/comment/write',data);
    return response.data;
}
interface LoveProps{
    article_id:number;
    username:string;
}
export const loveArticle = async(data:LoveProps)=>{
    const response = await UserApi.post('/api/article/love',data);
    return response.data;
}
interface FollwoProps{
    username:string;
    follower:string;
}
export const follow = async(data:FollwoProps)=>{
    const response = await UserApi.post('/api/user/follow',data);
    return response.data;
}
interface CreateRoomPorps{
    participants:string[];
}
export const createRoom = async(data:CreateRoomPorps)=>{
    const response = await UserApi.post('/api/chat/createRoom',data);
    return response.data;
}
interface RoomsProps{
    username:string;
}
export const getRooms = async(data:RoomsProps)=>{
    const response = await UserApi.get('/api/chat/rooms');
    return response.data;
}
interface RoomProps{
    room_id:number
}
export const getRoom = async(data:RoomProps)=>{
    const response = await UserApi.get('/api/room',{headers: {
        'RoomId': data.room_id
    }});
    return response.data;
}