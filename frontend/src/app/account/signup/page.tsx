"use client";
import { signUp } from '@/app/API/AuthAPI';
import { Google_big, Kakao_big } from '@/app/Global/OAuth';
import { useState } from 'react';

export default function Signup(){
    const [values, setValues] = useState({
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        nickname: "",
    });
    const handleChange = async (e:any) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        signUp(values)
            .then((response) => {
                window.location.href = `/account/login`;
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <main>
            <div className="flex justify-center items-center h-screen w-screen flex-col">
                <div className="w-[350px] h-[700px] border-black border flex flex-col items-center justify-center">
                    <img src="/commons/logo_big.png" className="w-[200px] h-[50px]" alt="logo_big" />
                    <label className="w-[260px] text-center m-5">친구들의 사진과 동영상을 보려면 가입하세요.</label>
                    <Google_big />
                    <Kakao_big />
                    <div className="divider w-3/4 self-center m-2">또는</div>
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" id="username" name="username" placeholder="아이디" value={values.username} onChange={handleChange}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" id="phoneNumber" name="phoneNumber" minLength={11} maxLength={11} placeholder="전화번호" value={values.phoneNumber} onChange={handleChange}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="email" className="grow" id="email" name="email" autoComplete="off"  placeholder="이메일" value={values.email} onChange={handleChange}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" id="password" name="password" autoComplete="off" placeholder="비밀번호" value={values.password} onChange={handleChange}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" id="nickname" name="nickname" placeholder="닉네임" value={values.nickname} onChange={handleChange}/>
                        </label>
                        <input type="submit" className="btn btn-info text-white w-[278px] btn-sm m-3" value="가입"/>
                    </form>
                </div>
                <div className="w-[350px] h-[100px] border-black border flex flex-col items-center justify-center mt-5">
                    <label>계정이 있으신가요? <a href="/account/login" className="text-blue-500">로그인</a></label>
                </div>
            </div>
        </main>
    );
}