import { getAPI } from "./AxiosAPI";


export const AuthApi = getAPI();

AuthApi.interceptors.request.use(
    (config) => {
        const TOKEN_TYPE = localStorage.getItem("tokenType");
        let ACCESS_TOKEN = localStorage.getItem("accessToken");
        config.headers["Authorization"] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
AuthApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error)
        // 응답 에러 : 에러코드로 처리 방법 지정
        //  ex) locaStorage에 토큰이 없음 -> 안내 메세지 후 로그인 페이지로 redirect,
        //  ex) access token 만료 -> refreshtoken으로 access토큰 재요청
    }
);

/** LOGIN API */
export const login = async ({ username, password }: { username: string, password: string }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/api/auth/login`, data);
    return response.data;
}
/** SIGNUP API */
export const signUp = async ({ username, password, email, phoneNumber, nickname }: { username: string, password: string, email: string, phoneNumber: string, nickname: string }) => {
    const data = { username, password, email, phoneNumber, nickname };
    const response = await AuthApi.post(`/api/user/signup`, data);
    return response.data;
}
export const OAuth = async (data: { type: string, code: string }) => {
    const response = await AuthApi.post(`/api/auth/OAuth`, data);
    return response.data;
}