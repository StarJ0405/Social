import {getAPI} from '@/app/API/axiosAPI';

export const NonUserApi = getAPI();
/** 게시글 불러오기 */
export const fetchArticleList = async({username , page}:{username:string,page:number}) => {
    const response = await NonUserApi.get(`/api/article/list`,{headers: {
        'Username': username,
        'Page': page,
    }});
    return response.data;
}

export const fetchUser = async(username : string) => {
    const response = await NonUserApi.get('/api/user/data',{headers: {
        'Username': username,
    }});
    return response.data ;
}
