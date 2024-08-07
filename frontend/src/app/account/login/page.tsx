"use client";
import { useState, useEffect, useRef } from 'react';
import { login, OAuth } from "@/app/Global/API/AuthAPI";
import { Google_small, Kakao_small } from "@/app/Global/OAuth";
import { redirect, useSearchParams } from 'next/navigation';


export default function Login() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const code = searchParams.get('code');
    useEffect(() => {
        if (type && code) {
            OAuth({ type: type, code: code }).then(response => {
                localStorage.clear();
                localStorage.setItem('tokenType', response.tokenType);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                window.location.href = `/`;
            }).catch(e => {
                console.log(e);
                window.location.href = "/";
            });

        }
    }, [type, code])
    const screenNumber = useRef(0);
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const handleChange = async (e: any) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        login(values)
            .then((response) => {
                localStorage.clear();
                localStorage.setItem('tokenType', response.tokenType);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                window.location.href = `/`;
            }).catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        const timer = setInterval(() => {
            const pre = document.getElementById('screen' + screenNumber);
            if (pre)
                pre.classList.add('opacity-0');
            const number = (screenNumber.current + 1) % 10;
            const now = document.getElementById('screen' + number);
            if (now)
                now.classList.remove('opacity-0');
            screenNumber.current = number;
        }, 4000);
        return () => clearInterval(timer);
    }, [screenNumber]);
    return (
        <div className="h-screen w-full flex items-center">
            <div className="w-full h-4/5 flex justify-center items-center">
                <div className="relative">
                    <img src="/commons/phone.png" className="w-[340px] h-[580px]" alt="phone" />
                    {/* <ScreenList /> */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <img key={i} className={"z-1 absolute transition-opacity duration-1000 ease-in left-[8.8%] top-[10.5%] w-[284px] h-[450px] " + (screenNumber.current != i ? "opacity-0" : "")} id={'screen' + i} src={"/commons/screen" + i + ".png"} alt="screen" />)}
                </div>
                <div className="w-[380px] h-[580px] m-10">
                    <div className="border border-black w-full h-4/5 mb-5 flex flex-col items-center justify-center">
                        <img src="/commons/logo_big.png" className="w-[200px] h-[100px] m-10" alt="logo_big" />
                        <form onSubmit={handleSubmit}>
                            <label className="input input-bordered flex items-center gap-2 m-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" className="grow" id="username" name="username" placeholder="아이디, 전화번호, 이메일" value={values.username} onChange={handleChange} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 m-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" id="password" name="password" autoComplete="off" placeholder="비밀번호" value={values.password} onChange={handleChange} />
                            </label>
                            <input type="submit" className="btn btn-info text-white w-[278px] btn-sm m-3" value="로그인" />
                        </form>
                        <div className="divider w-3/4 self-center m-2">또는</div>
                        {/* <Google_small /> */}
                        <Kakao_small />
                        {/* <a href="/account/findPW" className="m-5">비밀번호를 잊으셨나요?</a> */}
                    </div>
                    <div className="border border-black w-full h-[10%] flex justify-center items-center">
                        <label>계정이 없으신가요? <a href="/account/signup" className="text-blue-500">가입하기</a></label>
                    </div>
                </div>
            </div>
        </div>
    );
}