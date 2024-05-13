"use client";
import axios from "axios";
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/app/api/UserAPI';
import Image from "next/image";

function Profile() {
    const [user, setUser] = useState({});
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
            }).catch((error) => {
                console.log(error);
            });
        } else
            redirect("/account/login");
    }, [ACCESS_TOKEN]);
    console.log(user);
    return (
        <div className="avatar w-[44px] h-[44px]">
            <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile" />
            </div>
        </div>
    );
}
function More(){
     const handleLogout = async () => {
            localStorage.clear();
            window.location.href = `/account/login`;
    }
//     <div><button onClick={handleLogout}>logout</button></div>
    return (
        <div className="dropdown dropdown-top mt-auto">
          <div tabIndex="0" role="button" className="btn mb-3 w-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>더 보기</div>
          <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>설정</a></li>
            <li><a>모드전환</a></li>
            <li><a onClick={handleLogout}>로그아웃</a></li>
          </ul>
        </div>
    );
}
function Icon({isFold,name}:{isFold:boolean,name:string}){
    if( isFold)
        return null;
    else
        return <span className="pl-3">{name}</span>;
}

function Logo({isFold}:{isFold:boolean}){
    if(isFold)
        return <Image src="/logo_small.png" width="44" height="44" alt="logo small"/>;
    else
        return <Image src="/logo_big.png" width="100" height="50" alt="logo big"/>;
}

export default function Sidebar(){
    const [width, setWidth] = useState(0);
    const [isFold, setIsFold] = useState(false);
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
            setIsFold(window.innerWidth < 1250);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return (
        <div className={'sidebar h-screen border-r-2 flex flex-col justify-start '+ (isFold?"w-[100px]" :'w-[220px]')}>
            <div className="logo w-full h-[100px] pl-5 flex justify-start items-center">
                <a href="/">
                    <Logo isFold={isFold}/>
               </a>
            </div>
            <div className="home flex w-full h-[60px] pl-5 mb-3 items-center">
                <a href="/">
                    <Image src="/home.png" width={44} height={44} alt="home" />
                </a>
                <a href="/">
                    <Icon isFold={isFold} name="홈"/>
                </a>
            </div>
            <div className="search flex w-full h-[60px] pl-5 mb-3 items-center">
                <Image src="/search.png" width={44} height={44} alt="search"/>
                <Icon isFold={isFold} name="검색"/>
            </div>
            <div className="explore flex w-full h-[60px] pl-5 mb-3 items-center">
                <a href="/">
                    <Image src="/explore.png" width={44} height={44} alt="explore"/>
                </a>
                <a href="/">
                    <Icon isFold={isFold} name="탐색"/>
                </a>
            </div>
            <div className="message flex w-full h-[60px] pl-5 mb-3 items-center">
                <a href="/">
                    <Image src="/message.png" width={44} height={44} alt="message" />
                </a>
                <a href="/">
                     <Icon isFold={isFold} name="메시지"/>
                </a>
            </div>
            <div className="alarm flex w-full h-[60px] pl-5 mb-3 items-center">
                <Image src="/alarm.png" width={44} height={44} alt="alarm"/>
                <Icon isFold={isFold} name="알림"/>
            </div>
            <div className="profile flex w-full h-[60px] pl-5 mb-3 items-center">
                <Profile/>
                <Icon isFold={isFold} name="프로필"/>
            </div>
            <More />
        </div>
    );
}