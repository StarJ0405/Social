"use client";
import { fetchUser,UserApi,saveProfile } from '@/app/api/UserAPI';
import { redirect } from 'next/navigation';
import Modal from "@/app/global/Modal"
import { useEffect, useState } from 'react';
import {fetchArticleList} from '@/app/API/nonUserAPI';

export function Avatar({user}:{user:any}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const upload = async(e:any) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("file",file);
        saveProfile(formData)
        .then(response=> {
            setIsModalOpen(false);
            const profile_img = document.getElementById('profile_img') as HTMLImageElement;
            if(profile_img)
                profile_img.src=response.data;
            const mini_profile_img = document.getElementById('mini_profile_img') as HTMLImageElement;
            if(mini_profile_img)
                mini_profile_img.src=response.data;
        })
        .catch(error=>{console.log(error);});
    }

    return (
        <>
            <a onClick={()=>{
                const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
                if (ACCESS_TOKEN) {
                    fetchUser().then(response =>{
                            if(response.username == user.username)
                                setIsModalOpen(true);
                        }
                    );
                }else
                    redirect("/account/login");
            }}>
                <img id="profile_img" className="w-[200px] h-[200px]" src={user.profileImage?user.profileImage:'/commons/basic_profile.png'} alt="profile" />
            </a>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="flex flex-col w-[400px] justify-center items-center" escClose={true} outlineClose={true}>
                <label className="mt-5 text-xl font-bold">프로필 사진 바꾸기</label>
                <div className="divider m-1"></div>
                <label className="text-sm font-bold text-blue-400 cursor-pointer" onClick={()=>{const file = document.getElementById('file'); if(file)file.click();} }>사진 업로드</label>
                <input id="file" type="file" className="hidden" onChange={upload}/>
                <div className="divider m-1"></div>
                <label className="text-sm font-bold text-red-500 cursor-pointer" onClick={()=>{UserApi.delete('/api/file/profile');window.location.reload(); }}>현재 사진 삭제</label>
                <div className="divider m-1"></div>
                <button className="mb-2" onClick={() => setIsModalOpen(false)}>취소</button>
            </Modal>
        </>
     );
}

export function List(user:any){
    const[status] =useState(0);
    const [page,setPage] = useState(0);
    const[list,setList] = useState([] as any[]);
    useEffect(()=>{
        fetchArticleList({ username:user.username,page:page})
        .then(response => setList(response))
        .catch(error => console.log(error));
    },[page]);
    return (<>
        {status==0?<div>
        {list.map((article,index)=>(<div key={index}>{article.content}</div>))}    
        </div> :<></>}
    </>);
}