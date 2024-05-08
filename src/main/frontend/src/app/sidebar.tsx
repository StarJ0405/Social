"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import axios from 'axios';
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
function Profile(){
return (<div className="avatar w-[44px] h-[44px]">
            <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile" />
            </div>
        </div>);
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
        <div className={'sidebar h-screen border-r-2 '+ (isFold?"w-[100px]" :'w-[220px]')}>
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
        </div>
    );
}