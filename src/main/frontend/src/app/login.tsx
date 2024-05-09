"use client";
import { useState,useEffect } from 'react';
import Image from "next/image";
import axios from 'axios';

export function ScreenList() {
    const create = () => {
        const result = [];
        for(let i=0; i<=9; i++){
            result.push(<Screen key={i} num={i} />);
        }
        return result;
    };
    return (<div>{create()}</div>);
}

export function Screen({num}:{num:int}){
    return <Image className={"z-1 absolute transition delay-[2000] left-[30.6%] top-[26.2%] "+(num!=0?"opacity-0":"")} id={'screen'+num} src={"/screen"+num+".png"} width="284" height="450" alt="screen" />
}
export default function Login(){
    const [screenNumber, setScreenNumber] = useState(0);
    useEffect(() => {
        setInterval(()=>{
            const pre = document.getElementById('screen'+screenNumber);
            pre.classList.add('opacity-0');
            const number =Math.floor(Math.random()*10);
            const now = document.getElementById('screen'+number);
            now.classList.remove('opacity-0');
            setScreenNumber(number);
        },3000);
    }, []);
    return (
        <div className="h-screen w-full flex items-center">
            <div className="w-full h-4/5 flex justify-center items-center">
                <Image src="/phone.png" width="340" height="580" alt="phone"/>
                <ScreenList/>
                <div className="w-[380px] h-[580px] m-10">
                    <div className="border border-black w-full h-4/5 mb-5 flex flex-col items-center justify-center">
                        <Image src="/logo_big.png" width="200" height="100" alt="logo_big" className="m-10"/>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                          <input type="text" className="grow" name="username" placeholder="아이디, 전화번호, 이메일"/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                          <input type="password" className="grow" name="password" placeholder="비밀번호"/>
                        </label>
                        <input type="submit" className="btn btn-info w-[278px] btn-sm m-3" value="로그인"/>
                        <div className="divider w-3/4 self-center m-2">또는</div>
                        <div className="flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Image src="/google.png" width="16" height="16" alt="google" className="m-2"/>
                                <label>구글로 로그인</label>
                            </a>
                        </div>
                        <div className="flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Image src="/kakao.png" width="16" height="16" alt="kakao" className="m-2"/>
                                <label>카카오로 로그인</label>
                            </a>
                        </div>
                        <a href="/account/findPW" className="m-5">비밀번호를 잊으셨나요?</a>
                    </div>
                    <div className="border border-black w-full h-[10%] flex justify-center items-center">
                        <label>계정이 없으신가요? <a href="#">가입하기</a></label>
                    </div>
                </div>
            </div>
        </div>
    );
}