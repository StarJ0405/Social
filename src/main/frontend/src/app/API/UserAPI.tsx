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
    const response = await UserApi.get(`/api/user/user`);
    return response.data;
}
/** 회원수정 API */
export const updateUser = async (data:any) => {
    const response = await UserApi.put(`/api/user/user`, data);
    return response.data;
}
/** 회원탈퇴 API */
export const deleteUser = async () => {
    await UserApi.delete(`/api/user/user`);
}