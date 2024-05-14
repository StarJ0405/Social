"use client";
import axios from "axios";
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUser,UserApi } from '@/app/api/UserAPI';
import Modal from "@/app/global/Modal"

export default function Sidebar(){
    const [width, setWidth] = useState(0);
    const [isFold, setIsFold] = useState(false);
    const [user, setUser] = useState({});
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const upload = async(e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("file",file);
        const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
        await UserApi.post('/api/file/article', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=> {


        })
        .catch(error=>{alert('재시도 해주세요.');});
    }
    function Profile() {
        return (
            <div className="avatar w-[44px] h-[44px]">
                <div className="w-24 rounded-full">
                    <img src={user.profileImage!=null?user.profileImage:'/commons/basic_profile.png'} className="w-[24px] h-[24px]" alt="profile" />
                </div>
            </div>
        );
    }
    function More(){
         const handleLogout = async () => {
                localStorage.clear();
                window.location.href = `/account/login`;
        }
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
    function Logo(){
        if(isFold)
            return <img src="/commons/logo_small.png" className="w-[44px] h-[44px]" alt="logo small"/>;
        else
            return <img src="/commons/logo_big.png" className="w-[150px]" alt="logo big"/>;
    }
    function Icon({name}:{name:string}){
        if(isFold)
            return null;
        else
            return <span className="pl-3">{name}</span>;
    }
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
        <div className={'sidebar h-screen border-r-2 flex flex-col justify-start '+ (isFold?"w-[120px]" :'w-[300px]')}>
            <div className="logo w-full h-[100px] pl-5 flex justify-start items-center">
                <a href="/">
                    <Logo/>
               </a>
            </div>
            <div className="home flex w-full h-[60px] pl-5 mb-3 items-center">
                <a href="/">
                    <img src="/commons/home.png" className="w-[44px] h-[44px]" alt="home" />
                </a>
                <a href="/">
                    <Icon name="홈"/>
                </a>
            </div>
            <div className="search flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer">
                <img src="/commons/search.png" className="w-[44px] h-[44px]" alt="search"/>
                <Icon isFold={isFold} name="검색"/>
            </div>
            <div className="explore flex w-full h-[60px] pl-5 mb-3 items-center">
                <a href="/">
                    <img src="/commons/explore.png" className="w-[44px] h-[44px]" alt="explore"/>
                </a>
                <a href="/">
                    <Icon name="탐색"/>
                </a>
            </div>
            <div className="message flex w-full h-[60px] pl-5 mb-3 items-center">
                <a href="/">
                    <img src="/commons/message.png" className="w-[44px] h-[44px]" alt="message" />
                </a>
                <a href="/">
                     <Icon name="메시지"/>
                </a>
            </div>
            <div className="alarm flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer">
                <img src="/commons/alarm.png" className="w-[44px] h-[44px]" alt="alarm"/>
                <Icon  name="알림"/>
            </div>
            <div className="create flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer">
                <a onClick={() => setIsModalOpen(true)} className="flex items-center">
                    <img src="/commons/create.png" className="w-[44px] h-[44px]" alt="create"/>
                    <Icon  name="만들기"/>
                </a>
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="flex flex-col w-[750px] h-[800px] justify-start items-center" escClose={true} outlineClose={true}>
                <label className="font-bold text-lg w-full h-[24px] text-center mt-4">새 게시물 만들기</label>
                <div className="divider m-1"></div>
                <div className="flex h-full flex-col justify-center items-center font-bold text-2xl">
                    <img src="/commons/picture.png" className="w-[96px] h-[96px] m-3"/>
                    <label>사진과 동영상을 여기에 끌어다 놓으세요</label>
                    <button className="btn btn-sm btn-info text-white m-3" onClick={()=>{document.getElementById('article_img').click();}}>컴퓨터에서 선택</button>
                    <input id="article_img" type="file" className="hidden" onChange={upload}/>
                </div>
            </Modal>
            <div className="profile flex w-full h-[60px] pl-5 mb-3 items-center">
                <a className="flex items-center" href={'/'+user.username}>
                    <Profile />
                    <Icon name="프로필"/>
                </a>
            </div>
            <More />
        </div>
    );
}