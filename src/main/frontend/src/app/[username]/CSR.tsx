"use client";
import { fetchUser,UserApi,saveProfile } from '@/app/api/UserAPI';
import Modal from "@/app/global/Modal"
import { useEffect, useState } from 'react';
import {fetchArticleList} from '@/app/API/nonUserAPI';
import DropDown from '../Global/DropDown';
import { EmoteButton, EmoteDropDown } from '../global/Emotes';


export function Avatar({user,isUser}:{user:any, isUser:boolean}){
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
                profile_img.src=response;
            const mini_profile_img = document.getElementById('mini_profile_img') as HTMLImageElement;
            if(mini_profile_img)
                mini_profile_img.src=response;
        })
        .catch(error=>{console.log(error);});
    }

    return (
        <>
            <a onClick={()=>{
                fetchUser().then(response =>{
                        if(response.username == user.username)
                            setIsModalOpen(true);
                    }
                );
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

export function List({user,isUser}:{user:any,isUser:boolean}){
    const[status,setStatus] =useState(0);
    const [page,setPage] = useState(0);
    const[list,setList] = useState([] as any[]);
    
    useEffect(()=>{
        fetchArticleList({username:user.username,page:page})
        .then(response => setList(response))
        .catch(error => console.log(error));
    },[page]);
    function Days({dateTime}:{dateTime:number}){
        const result = (new Date().getTime()- dateTime)/1000;
        let msg = "";
        if(result < 60)
            msg=result+"초 전";
        else if( result < 60*60)
            msg= Math.floor(result/60)+"분 전";
        else if(result < 60*60*24)
            msg= Math.floor(result/60/60)+"시간 전";
        else if(result < 60*60*24/14)
            msg= Math.floor(result/60/60/24)+"일 전";
        else 
            msg= Math.floor(result/60/60/24/7)+"주 전";
        return <> {msg} </>;
    }

    function GetDate({dateTime}:{dateTime:number}){

        const date = new Date(dateTime);
        return <>{
            date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일 " + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초 " +  '일월화수목금토'.charAt(date.getUTCDay())+'요일'
        }</>;
    }
    function Article({article,index}:{article:any,index:number}){
       const[over,setOver] = useState(-1);
       const[isModalOpen, setIsModalOpen] = useState(false);
       const[isProfile, setIsProfile] = useState(false);
       const[submitable, setSubmitable] = useState(false);
       const[isOpen, setIsOpen] = useState(false);
       return (<>
        {index==over ? <div className='absolute bg-black opacity-20 cursor-pointer w-[309px] h-[309px]' onClick={()=>setIsModalOpen(true)} onMouseEnter={()=>setOver(index)} onMouseLeave={()=>setOver(-1)}></div> : null}
            <img src={article.img_url} onMouseEnter={()=>setOver(index)} onMouseLeave={()=>setOver(-1)} className='w-[309px] h-[309px]' alt={article.id} />
            <Modal open={isModalOpen} onClose={()=>{setIsModalOpen(false)}} className='w-[1400px] h-[900px] flex' escClose={true} outlineClose={true} >
                <img src={article.img_url} className='w-[900px] h-[900px]'/>
                <div className='flex flex-col w-full relative'>
                    <div className='w-full flex justify-between p-2'>
                        <div className='flex items-center cursor-pointer' onMouseOver={()=>setIsProfile(true)} onMouseLeave={()=>setIsProfile(false)}>
                            <img src={user.profileImage} className='w-[44px] h-[44px] rounded-full cursor-pointer' alt={user.username}/>
                            <label className='p-2 cursor-pointer hover:text-gray-400'>{user.username}</label>
                        </div>
                        <img src="/commons/more.png" className='p-2 w-[48px] h-[48px] cursor-pointer'/>
                    </div>
                    <DropDown open={isProfile} onClose={()=>setIsProfile(false)} className='w-[400px] h-[200px] bg-base-100 top-[7.5%] left-[2.5%] border '>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <img src={user.profileImage} className='rounded-full w-[66px] h-[66px]'/> 
                                <div className='p-2 flex flex-col justify-center'>
                                    <label className='font-bold text-xl'>{user.username}</label>
                                    <label className='text-gray-500 text-sm'>{user.nickname}</label>
                                </div>
                            </div>
                            <div className='flex justify-evenly items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <label>{list.length}</label>
                                    <label>게시물</label>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <label>{user.followers.length}</label>
                                    <label>팔로워</label>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <label>{user.followings.length}</label>
                                    <label>팔로잉</label>
                                </div>
                            </div>
                        </div>
                    </DropDown>
                    <div className='divider m-1'></div>
                    <div className='flex flex-col w-full h-[650px]'>
                        <div className='p-2 flex'>
                            <img src={user.profileImage} className='rounded-full w-[44px] h-[44px]'/> 
                            <div className='flex flex-col justift-center p-2'>
                                <label onClick={()=>console.log(article)}>{user.nickname}</label>
                                <label><Days dateTime={article.dateTime}/> </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <img src="/commons/heart_off.png" className='p-2 w-[40px] h-[40px] cursor-pointer' alt="save"></img>
                            <img src="/commons/link.png"  className='p-2 w-[40px] h-[40px] cursor-pointer' alt="save"></img>
                        </div>
                        <img src="/commons/save_off.png"  className='p-2 w-[40px] h-[40px] cursor-pointer' alt="save"></img>
                    </div>
                    <label className='p-2 text-sm font-bold text-gray-400'><GetDate dateTime={article.dateTime}/></label>
                    <div className='divider m-1'></div>
                    <EmoteDropDown input_id='text' open={isOpen} setIsOpen={(v:boolean)=>setIsOpen(v)} position='bottom-[50px] left-[10px]' onClick={()=>{const text = document.getElementById('text') as HTMLInputElement; if(text)setSubmitable(text.value.length>0); }}/>
                    <div className="p-2 flex">
                        <EmoteButton open={isOpen} setIsOpen={(v:boolean)=>setIsOpen(v)}/>
                        <input className='w-[400px] p-2' type="text" id="text" placeholder='댓글 달기...' onKeyDown={(e)=>{if(e.key=="Enter") alert("submit"); setSubmitable((e.target as HTMLInputElement).value.length >0);}} onKeyUp={(e)=>{ setSubmitable((e.target as HTMLInputElement).value.length >0);} }/>
                        <button disabled={!submitable} id="text_button" className={'p-2 text-center font-bold ' + (submitable?'text-blue-500':'text-gray-500')}>게시</button>
                    </div>
                </div>
            </Modal>
        </>);
    }
    return (<>
        {status==0?
            <div className='flex flex-wrap'>
                {list.map((article,index)=>(
                    <div key={index} > 
                        <Article article={article} index={index} />
                    </div>))}
            </div>
        :
            <></>
        }
    </>);
}