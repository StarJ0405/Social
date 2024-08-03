const google = "#";
const kakao = "#";
export function Kakao_small(){
    return (
        <div className="flex justify-center items-center">
                <a href={kakao} className="flex justify-center items-center">
                    <img src="/commons/kakao.png" className="w-[16px] h-[16px] m-2" alt="kakao"/>
                    <label>카카오로 로그인</label>
                </a>
        </div>
    );
}
export function Google_small(){
    return (
         <div className="flex justify-center items-center">
                <a href={google} className="flex justify-center items-center">
                    <img src="/commons/google.png" className="w-[16px] h-[16px] m-2" alt="google"/>
                    <label>구글로 로그인</label>
                </a>
        </div>
    );
}

export function Google_big(){
    return (
         <div className="flex justify-center items-center">
                <a href={google} className="flex justify-center items-center btn btn-info btn-sm m-1 text-white">
                    <img src="/commons/google.png" className="w-[16px] h-[16px]" alt="google"/>
                    <label>구글로 로그인</label>
                </a>
        </div>
    );
}
export function Kakao_big(){
    return (
        <div className="flex justify-center items-center">
                <a href={kakao} className="flex justify-center items-center btn btn-info btn-sm m-1 text-white">
                    <img src="/commons/kakao.png" className="w-[16px] h-[16px]" alt="kakao" />
                    <label>카카오로 로그인</label>
                </a>
        </div>
    );
}
