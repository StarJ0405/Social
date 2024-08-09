


const google = "#";
const kakaoClientId = '4ea554316bc8ea998de596ece63aaa45';
// const kakaoRedirectUri = 'http://localhost:3000/account/login?type=kakao'
const kakaoRedirectUri = 'http://server.starj.kro.kr:13102/account/login?type=kakao'
const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
export function Kakao_small() {
    return (
        <div className="flex justify-center items-center cursor-pointer">
            <a href={kakao} className="flex justify-center items-center">
                <img src="/commons/kakao.png" className="w-[16px] h-[16px] m-2 " alt="kakao" />
                카카오로 로그인
            </a>
        </div >
    );
}
export function Kakao_big() {
    return (
        <div className="flex justify-center items-center cursor-pointer">
            <a href={kakao} className="flex justify-center items-center btn btn-info btn-sm m-1 text-white cursor-pointer">
                <img src="/commons/kakao.png" className="w-[16px] h-[16px]" alt="kakao" />
                카카오로 로그인
            </a>
        </div>
    );
}

export function Google_small() {
    return (
        <div className="flex justify-center items-center">

            <a href={google} className="flex justify-center items-center">
                <img src="/commons/google.png" className="w-[16px] h-[16px] m-2" alt="google" />
                <label>구글로 로그인</label>
            </a>
        </div >
    );
}

export function Google_big() {
    return (
        <div className="flex justify-center items-center">
            <a href={google} className="flex justify-center items-center btn btn-info btn-sm m-1 text-white">
                <img src="/commons/google.png" className="w-[16px] h-[16px]" alt="google" />
                <label>구글로 로그인</label>
            </a>
        </div>
    );
}
