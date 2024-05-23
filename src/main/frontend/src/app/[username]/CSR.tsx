"use client";
import { deleteProfile, fetchUser,saveProfile, writeComment } from '@/app/api/UserAPI';
import Modal from "@/app/global/Modal"
import { useEffect, useState } from 'react';
import {fetchArticleList} from '@/app/API/nonUserAPI';
import DropDown, { Direcion } from '../Global/DropDown';
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
                <label className="text-sm font-bold text-red-500 cursor-pointer" onClick={()=>{deleteProfile().then(response =>window.location.reload()).catch(error=>console.log(error))  }}>현재 사진 삭제</label>
                <div className="divider m-1"></div>
                <button className="mb-2" onClick={() => setIsModalOpen(false)}>취소</button>
            </Modal>
        </>
     );
}

export function List({user,isUser}:{user:any,isUser:boolean}){
    const[status,setStatus] =useState(0);
    const[page,setPage] = useState(0);
    const[list,setList] = useState([] as any[]);
    const[over,setOver] = useState(-1);
    const[hoverDropDown, setHoverDropDown] = useState({user:{} as any, bg:"",b:""});
    const[submitable, setSubmitable] = useState(false);
    const[isOpen, setIsOpen] = useState(false);
    const[article,setArticle] = useState({id:-1,img_url:"", tags:[]as any[], comments: [] as any[], content:"", dateTime:0});
    const[timer, setTimer] = useState([] as any);
    useEffect(()=>{
        fetchArticleList({username:user.username,page:page})
        .then(response => setList(response))
        .catch(error => console.log(error));
    },[page]);
    function Days({dateTime}:{dateTime:number}){
        const result = (new Date().getTime()- dateTime)/1000;
        let msg = "";
        if(result < 60)
            msg= Math.floor(result)+"초 전";
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
    function refresh(){
        fetchArticleList({username:user.username,page:page})
        .then(response => {
            setList(response)
            if(article)
                (response as any[]).map(item  => {if(item.id==article.id){setArticle(item);} });
        })
        .catch(error => console.log(error));
    }
    function openArticle(now:any){
        setArticle(now);
        closeHoverDropDown();
    }
    function closeArticle(){
        setArticle({id:-1, img_url:"", tags:[]as any[], comments: [] as any[], content:"", dateTime:0});
    }
    function openHoverDropDown(user:any, bg:string,b:string){
        setHoverDropDown({user:user, bg:bg,b:b});
        if(timer){
            clearInterval(timer);
            setTimer([]as any);
        }
    }
    function closeHoverDropDown(){
        const timer = setInterval(()=>{setHoverDropDown({user:{} as any, bg:"",b:""}); clearInterval(timer);setTimer([]as any);},200);
        setTimer(timer);
    }
    return (<>
        {status==0?
            <div className='flex flex-wrap'>
                {list.map((now,index)=>(
                    <div key={index} > 
                        {index==over ? <div className='absolute bg-black opacity-20 cursor-pointer w-[309px] h-[309px]' onClick={()=>openArticle(now)} onMouseEnter={()=>setOver(index)} onMouseLeave={()=>setOver(-1)}></div> : null}
                        <img src={now.img_url} onMouseEnter={()=>setOver(index)} onMouseLeave={()=>setOver(-1)} className='w-[309px] h-[309px]' alt={now.id} />
                    </div>))}
                    <Modal open={article.id >=0} onClose={()=>closeArticle()} className='w-[1400px] h-[900px] flex' escClose={true} outlineClose={true} >
                        <img src={article.img_url} className='w-[900px] h-[900px]'/>
                        <div id='pbg-1' className='flex flex-col w-full relative'>
                            <div className='w-full flex justify-between p-2'>
                                <div id='pb-1' className='flex items-center cursor-pointer' onMouseEnter={()=>openHoverDropDown(user,"pbg-1","pb-1")} onMouseLeave={()=>closeHoverDropDown()}>
                                    <img src={user.profileImage} className='w-[44px] h-[44px] rounded-full cursor-pointer' alt={user.username}/>
                                    <label className='p-2 cursor-pointer hover:text-gray-400 font-bold'>{user.username}</label>
                                </div>
                                <img src="/commons/more.png" className='p-2 w-[48px] h-[48px] cursor-pointer'/>
                            </div>
                            <DropDown open={hoverDropDown.bg!=""} onClose={()=>closeHoverDropDown()} className='bg-base-100 border ' width={400} height={200} defaultDriection={Direcion.DOWN} background={hoverDropDown.bg} button={hoverDropDown.b} >
                                    <div className='flex flex-col h-[100%]' onMouseEnter={()=>openHoverDropDown(hoverDropDown.user,hoverDropDown.bg,hoverDropDown.b)} >
                                        <div className='flex items-center'>
                                            <img src={hoverDropDown.user.profileImage} className='rounded-full w-[66px] h-[66px]'/> 
                                            <div className='p-2 flex flex-col justify-center'>
                                                <label className='font-bold text-xl'>{hoverDropDown.user.username}</label>
                                                <label className='text-gray-500 text-sm'>{hoverDropDown.user.nickname}</label>
                                            </div>
                                        </div>
                                        <div className='flex justify-evenly items-center'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <label>{hoverDropDown.user.articleCount}</label>
                                                <label>게시물</label>
                                            </div>
                                            <div className='flex flex-col items-center justify-center'>
                                                <label>{hoverDropDown.user.followers?.length}</label>
                                                <label>팔로워</label>
                                            </div>
                                            <div className='flex flex-col items-center justify-center'>
                                                <label>{hoverDropDown.user.followings?.length}</label>
                                                <label>팔로잉</label>
                                            </div>
                                        </div>
                                        <button className='btn mt-7 text-lg '>팔로우</button>
                                    </div>
                                </DropDown>
                            <div className='divider m-1'></div>
                            <div id="comments" className='flex flex-col w-full h-[650px] overflow-y-scroll'>
                                <label className='pl-2'>{(article.tags as any[]).map((tag,index)=><a key={index} href="#" className='text-blue-500'>{'#'+tag}</a>) }</label>
                                <div className='p-2 flex relative'>
                                            <img id={'cb-1'} src={user.profileImage} className='rounded-full w-[44px] h-[44px] cursor-pointer' onMouseEnter={()=>openHoverDropDown(user, 'pbg-1','cb-1')} onMouseLeave={()=>closeHoverDropDown()} /> 
                                            <div className='flex w-[456px] flex-col justify-center p-2'>
                                                <div><label className='font-bold cursor-pointer]' onMouseEnter={()=>openHoverDropDown(user, 'pbg-1','cb-1')} onMouseLeave={()=>closeHoverDropDown()}>{user.nickname}</label></div>
                                                <label className='w-[400px] break-words'>{article.content}</label>
                                                <label className='text-xs'><Days dateTime={article.dateTime}/> </label>
                                            </div>
                                        </div>
                                {(article.comments as any[]).map((comment, index)=>(
                                    <div key={index}>
                                        <div className='p-2 flex relative'>
                                            <img id={'cb'+index} src={comment.user.profileImage} className='rounded-full w-[44px] h-[44px] cursor-pointer' onMouseEnter={()=>openHoverDropDown(comment.user,'pbg-1','cb'+index)} onMouseLeave={()=>closeHoverDropDown()} onClick={()=>{if(comment.user.username != user.username)window.location.href="/"+comment.user.username;}}/> 
                                            <div className='flex w-[456px] flex-col justify-center p-2'>
                                                <div><label className='font-bold cursor-pointer]' onMouseEnter={()=>openHoverDropDown(comment.user, 'pbg-1','cb'+index)} onMouseLeave={()=>closeHoverDropDown()}>{comment.user.nickname}</label></div>
                                                <label className='w-[400px] break-words'>{comment.comment}</label>
                                                <label className='text-xs'><Days dateTime={comment.dateTime}/> </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                            <EmoteDropDown input_id='text' open={isOpen} setIsOpen={(v:boolean)=>setIsOpen(v)} onClick={()=>{const text = document.getElementById('text') as HTMLInputElement; if(text)setSubmitable(text.value.length>0); }} background='pbg-1' button='eb'/>
                            <div className="p-2 flex">
                                <EmoteButton id="eb" open={isOpen} setIsOpen={(v:boolean)=>setIsOpen(v)}/>
                                <input className='w-[400px] p-2' type="text" id="text" maxLength={255} placeholder='댓글 달기...' onKeyDown={(e)=>{if(e.key=="Enter") document.getElementById('text_button')?.click(); setSubmitable((e.target as HTMLInputElement).value.length >0);}} onKeyUp={(e)=>{ setSubmitable((e.target as HTMLInputElement).value.length >0);} }/>
                                <button disabled={!submitable} id="text_button" className={'p-2 text-center font-bold ' + (submitable?'text-blue-500':'text-gray-500')} onClick={()=>{ const text = (document.getElementById('text') as HTMLInputElement); writeComment({article_id: article.id, comment: text.value}).then(response => refresh()); text.value=''; setSubmitable(false); }} >게시</button>
                            </div>
                        </div>
                    </Modal>
            </div>
        :
            <></>
        }
    </>);
}