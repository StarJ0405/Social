import { getAPI } from "./AxiosAPI";


export const NonUserApi = getAPI();
/** 게시글 불러오기 */
export const fetchArticle = async({article_id}:{article_id:number}) => {
    const response = await NonUserApi.get(`/api/article`,{headers: {
        'ArticleID': article_id,
    }});
    return response.data;
}
export const fetchArticleList = async({username , page}:{username:string,page:number}) => {
    const response = await NonUserApi.get(`/api/article/list`,{headers: {
        'Username': username,
        'Page': page,
    }});
    return response.data;
}
export const fetchExplore = async({username , page}:{username:string,page:number}) => {
    const response = await NonUserApi.get(`/api/article/explore`,{headers: {
        'Username': username,
        'Page': page,
    }});
    return response.data;
}

export const fetchnonUser = async(username : string) => {
    const response = await NonUserApi.get('/api/user/data',{headers: {
        'Username': username,
    }});
    return response.data ;
}
export const fetchnonUsers = async(like : string, username : string) => {
    const response = await NonUserApi.get('/api/user/list',{headers: {
        'Like': like,
        'NotInclude': username
    }});
    return response.data ;
}
export const fetchnonRecentUsers = async(username : string) => {
    const response = await NonUserApi.get('/api/user/recent',{headers: {
        'NotInclude': username
    }});
    return response.data ;
}

