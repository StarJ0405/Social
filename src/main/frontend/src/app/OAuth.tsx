import Image from "next/image";
const google = "#";
const kakao = "#";
export function Kakao_small(){
    return (
        <div className="flex justify-center items-center">
                <a href={kakao} className="flex justify-center items-center">
                    <Image src="/kakao.png" width="16" height="16" alt="kakao" className="m-2"/>
                    <label>카카오로 로그인</label>
                </a>
        </div>
    );
}
export function Google_small(){
    return (
         <div className="flex justify-center items-center">
                <a href={google} className="flex justify-center items-center">
                    <Image src="/google.png" width="16" height="16" alt="google" className="m-2"/>
                    <label>구글로 로그인</label>
                </a>
        </div>
    );
}

export function Google_big(){
    return (
         <div className="flex justify-center items-center">
                <a href={google} className="flex justify-center items-center btn btn-info btn-sm m-1 text-white">
                    <Image src="/google.png" width="16" height="16" alt="google"/>
                    <label>구글로 로그인</label>
                </a>
        </div>
    );
}
export function Kakao_big(){
    return (
        <div className="flex justify-center items-center">
                <a href={kakao} className="flex justify-center items-center btn btn-info btn-sm m-1 text-white">
                    <Image src="/kakao.png" width="16" height="16" alt="kakao" />
                    <label>카카오로 로그인</label>
                </a>
        </div>
    );
}
