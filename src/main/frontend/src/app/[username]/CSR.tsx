'use client';

import { useEffect, useState } from "react";
import { deleteProfile, fetchUser, follow, loveArticle, saveProfile, writeComment } from "../api/UserAPI";
import Modal from "../global/Modal";
import { fetchArticle, fetchArticleList, fetchnonUser } from "../API/NonUserAPI";
import { EmoteButton, EmoteDropDown } from "../global/Emotes";
import DropDown, { Direcion } from "../Global/DropDown";

interface pageProps {
    serverOwner:any;
    ServerArticleList:any[];
}
async function upload(e:any,setIsAvatarModalOpen:(status:boolean)=>void){
    const formData = new FormData();
        const file = e.target.files[0];
        formData.append('file',file);
        saveProfile(formData)
        .then(response=> {
            setIsAvatarModalOpen(false);
            const profile_img = document.getElementById('profile_img') as HTMLImageElement;
            if(profile_img)
                profile_img.src=response;
            const mini_profile_img = document.getElementById('mini_profile_img') as HTMLImageElement;
            if(mini_profile_img)
                mini_profile_img.src=response;
        })
        .catch(error=>{console.log(error);});
}
export function Days({dateTime}:{dateTime:number}){
    const result = (new Date().getTime()- dateTime)/1000;
    let msg = '';
    if(result < 60)
        msg= Math.floor(result)+'초 전';
    else if( result < 60*60)
        msg= Math.floor(result/60)+'분 전';
    else if(result < 60*60*24)
        msg= Math.floor(result/60/60)+'시간 전';
    else if(result < 60*60*24*14)
        msg= Math.floor(result/60/60/24)+'일 전';
    else 
        msg= Math.floor(result/60/60/24/7)+'주 전';
    return <> {msg} </>;
}
export function GetDate({dateTime}:{dateTime:number}){
    const date = new Date(dateTime);
    return <>{
        date.getFullYear() + '년 ' + (date.getMonth()+1) + '월 ' + date.getDate() + '일 ' + date.getHours() + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초 ' +  '일월화수목금토'.charAt(date.getUTCDay())+'요일'
    }</>;
}
function test(){
    return <button></button>
}
export default function CSR_PAGE(props : pageProps){
    // 변수 구역
    const[owner, setOwner] = useState(props.serverOwner);
    const[articleList, setArticleList] = useState(props.ServerArticleList);
    const[isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const[user, setUser] = useState(null as any);
    const[isFollower, setIsFollower] = useState(false);
    const[page, setPage]=useState(0);
    const[size, setSize]=useState({width:1,height:1});
    const[reaplacer, setReplacer]= useState(null as any);
    const[openArticle, setOpenArticle] = useState(null as any);
    const[isLoading, setIsLoading] = useState(false);
    const[over, setOver] = useState(-1);
    const[show, setShow] = useState(0);
    const[hoverDropDown, setHoverDropDown] = useState(null as any);
    const[timer, setTimer] = useState(null as any);
    const[isEmoteOpen, setIsEmoteOpen] = useState(false);
    const[submitable, setSubmitable] = useState(false);
    const[love, setLove] = useState(null as any);
    const[followers, setFollowers] = useState(null as unknown as any[]);
    const[followings, setFollowings] = useState(null as unknown as any[]);
    // useEffect 구역
    useEffect(()=>{
        fetchUser()
        .then(response => {
            setUser(response);
            setIsFollower(owner.followers?.filter((check:any)=>check.username=response.username).length>0);
        })
        .catch(error=>console.log(error));
        if(typeof window !== 'undefined'){
            if(localStorage.getItem(owner.username+'articleList'))
                setArticleList(JSON.parse(localStorage.getItem(owner.username+'articleList') as string));
        }
    }
    ,[]);
    useEffect(()=>{
        if(reaplacer)
            if(reaplacer.type="article"){
                if(openArticle?.id==reaplacer.value.id)
                    setOpenArticle(reaplacer.value);
            }
        return ()=>setReplacer(null);
    },[reaplacer]);
    useEffect(() => {
        const updateSize = () => {
            setSize({width:window.innerWidth/screen.availWidth, height: window.innerHeight/screen.availHeight});
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    useEffect(() => {
        const loadPage = () => {
            const scrollLocation  = document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const fullHeight = document.body.scrollHeight;
            if(scrollLocation + windowHeight >= fullHeight){
                setIsLoading(true);
                fetchArticleList({username:owner.username,page:page+1})
                .then(response => {
                    if(response.length>0){
                        const newlist = [...articleList,...response];
                        setArticleList(newlist);
                        setPage(page+1);
                        localStorage.setItem(owner.username,JSON.stringify(newlist));
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);} );
            }
        };
        window.addEventListener('scroll',loadPage);
        return () => window.removeEventListener('scroll',loadPage);
    },[page]);
    // 함수 구역 
    function IsOwner(){
        return user?.username == owner.username;
    }
    async function RefershOwner(){
        const newOwner = await fetchnonUser(owner.username);
        setOwner(newOwner);
        setIsFollower(newOwner.followers?.filter((check:any)=>check.username=user.username).length>0);
    }
    async function RefreshArticle(article_id:number){
        const article = await fetchArticle({article_id});
        setReplacer({id:"article",value:article});
        for(let i=0; i<articleList.length;i++)
            if(articleList[i].id==article.id){
                articleList[i]=article;
                setArticleList(articleList);
                break;
            }
        if(hoverDropDown)
            if(owner.username == hoverDropDown?.user.username)
                fetchnonUser(owner.username).then(response=> {
                    setOwner(response);
                    setHoverDropDown({user:response, bg:hoverDropDown.bg, b:hoverDropDown.b});
                });
            else{
                const nowUser = (article?.comments as any[])?.filter(item => item.user.username==hoverDropDown?.user.username)[0];
                if(nowUser){
                    setHoverDropDown({user:nowUser.user, bg:hoverDropDown.bg, b:hoverDropDown.b});                
                    fetchnonUser(owner.username).then(response=> {
                        setOwner(response);
                    });
                }
            }
    }
    function OpenArticle(now:any){
        setOpenArticle(now);
        CloseHoverDropDown();
        if(love?.id!=now.id)
            setLove({id : now.id, status:now.lovers.includes(owner.username)});
    }
    function CloseArticle(){
        setOpenArticle(null);
    }
    function OpenHoverDropDown(owner:any, bg:string,b:string){
        setHoverDropDown({user:owner, bg:bg,b:b});
        if(timer){
            clearInterval(timer);
            setTimer(null);
        }
    }
    function CloseHoverDropDown(){
        const timer = setInterval(()=>{setHoverDropDown(null); clearInterval(timer);setTimer(null);},200);
        setTimer(timer);
    }
    function openFollower(){
        if(user?.username == owner?.username){
            setFollowers(user.followers);
        }
    }
    function closeFollower(){
        setFollowers(null as unknown as any[]);
    }
    function openFollowing(){
        if(user?.username == owner?.username){
            setFollowings(user.followings);
        }
    }
    function closeFollowing(){
        setFollowings(null as unknown as any[]);
    }
    const w = Math.floor(309*size.width);
    const h = Math.floor(309*size.height);
    return  <>
        <div className="flex justify-center w-[80%] mt-5">
            <div className="avatar w-[250px] h-[200px] flex justify-center cursor-pointer">
                <div className="w-200 rounded-full">
                    <a onClick={()=>{
                        if(user.username == owner.username)
                            setIsAvatarModalOpen(true);
                    }}>
                        <img id='profile_img' className='w-[200px] h-[200px]' src={owner.profileImage?owner.profileImage:'/commons/basic_profile.png'} alt='profile' />
                    </a>
                    <Modal open={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} className='flex flex-col w-[400px] justify-center items-center' escClose={true} outlineClose={true}>
                        <label className='mt-5 text-xl font-bold'>프로필 사진 바꾸기</label>
                        <div className='divider m-1'></div>
                        <label className='text-sm font-bold text-blue-400 cursor-pointer' onClick={()=>{const file = document.getElementById('file'); if(file)file.click();} }>사진 업로드</label>
                        <input id='file' type='file' className='hidden' onChange={(e)=>upload(e,setIsAvatarModalOpen)}/>
                        <div className='divider m-1'></div>
                        <label className='text-sm font-bold text-red-500 cursor-pointer' onClick={()=>{deleteProfile().then(response =>window.location.reload()).catch(error=>console.log(error))  }}>현재 사진 삭제</label>
                        <div className='divider m-1'></div>
                        <button className='mb-2' onClick={() => setIsAvatarModalOpen(false)}>취소</button>
                    </Modal>
                </div>
            </div>
            <div className="flex flex-col w-[250px]">
                <div className="mb-5">
                    <label className="mr-5">{owner.username}</label>
                    {IsOwner() ? 
                        <>
                            {/* <button className='btn'>프로필 편집</button> */}
                        </>
                        :
                        <>
                            <button className='btn' onClick={()=>{follow({username:owner.username,follower:user.username}).then(response=> RefershOwner());}}>{ isFollower ? '팔로우 해제': '팔로우'}</button>
                            {/* <button className='btn' >메시지 보내기</button> */}
                        </>
                    }
                        
                </div>
                <div className="mb-5">
                    <label className="mr-5">게시물 {owner.articleCount}</label>
                    <label className="mr-5 cursor-pointer" onClick={()=>openFollower()}>팔로워 {owner.followers?.length}</label>
                    <label className="mr-5 cursor-pointer" onClick={()=>openFollowing()}>팔로우 {owner.followings?.length}</label>
                    <Modal open={followers!= null} onClose={()=>closeFollower()} className="w-[400px] h-[400px] flex flex-col" escClose={true} outlineClose={true} >
                        <div className="flex items-center justify-center mt-3">
                            <label className="font-bold ml-[50px] w-[300px] text-lg text-center">팔로워</label>
                            <button className="w-[50px]" onClick={()=>closeFollower()}>X</button>
                        </div>
                        <div className="divider my-2"></div>
                        <div className="flex flex-col items-center overflow-y-scroll h-full">
                            {followers?.length>0?
                                <>
                                    {followers.map((follow,index)=>
                                        <div key={index} className="flex items-center">
                                            <img style={{width:55+'px',height:55+'px'}} className="rounded-full cursor-pointer" src={follow.follower_image?follow.follower_image:'/commons/basic_profile.png'}  alt="follow_img" onClick={()=>window.location.href="/"+follow.follower}/>
                                            <div className="flex flex-col w-[225px] px-2 cursor-pointer" onClick={()=>window.location.href="/"+follow.follower}>
                                                <label className="font-bold cursor-pointer">{follow.follower_nickname}</label>
                                                <label className="cursor-pointer">{follow.follower}</label>
                                            </div>
                                            {/* <button>삭제</button> */}
                                        </div>
                                    )}
                                </>
                            :
                                <>
                                    <img src="/commons/basic_profile.png" className="my-2 mx-6" style={{width:96+'px',height:96+'px'}} alt="noOne"></img>
                                    <label className="text-2xl w-full">회원님을 팔로우하는 사람</label>
                                    <label className="text-sm w-full">회원님을 팔로우하는 사람들이 여기에 표시됩니다.</label>
                                </>
                            }
                        </div>
                    </Modal>
                    <Modal open={followings!= null} onClose={()=>closeFollowing()} className="w-[400px] h-[400px] flex flex-col" escClose={true} outlineClose={true} >
                        <div className="flex items-center justify-center mt-3">
                            <label className="font-bold ml-[50px] w-[300px] text-lg text-center">팔로잉</label>
                            <button className="w-[50px]" onClick={()=>closeFollowing()}>X</button>
                        </div>
                        <div className="divider my-2"></div>
                        <div className="flex flex-col items-center overflow-y-scroll h-full">
                            {followings?.length>0?
                                <>
                                    {followings.map((follow,index)=>
                                        <div key={index} className="flex items-center" >
                                            <img style={{width:55+'px',height:55+'px'}} className="rounded-full cursor-pointer" src={follow.user_image?follow.user_image:'/commons/basic_profile.png'}  alt="follow_img" onClick={()=>window.location.href="/"+follow.user}/>
                                            <div className="flex flex-col w-[225px] px-2 cursor-pointer" onClick={()=>window.location.href="/"+follow.user}>
                                                <label className="font-bold cursor-pointer">{follow.user_nickname}</label>
                                                <label className="cursor-pointer">{follow.user}</label>
                                            </div>
                                            {/* <button>삭제</button> */}
                                        </div>
                                    )}
                                </>
                            :
                                <>
                                    <img src="/commons/basic_profile.png" className="my-2 mx-6" style={{width:96+'px',height:96+'px'}} alt="noOne"></img>
                                    <label className="text-2xl w-full">회원님이 팔로우하는 사람</label>
                                    <label className="text-sm w-full">회원님이 팔로우하는 사람들이 여기에 표시됩니다.</label>
                                </>
                                
                            }
                        </div>
                    </Modal>
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold">{owner.nickname}</label>
                    <label>{owner.description}</label>
                </div>
            </div>
        </div>
        <div className='self-center divider'></div>
        
        {show ==0?
            <div className='flex flex-wrap'>
                {articleList.map((nowArticle,index)=>(
                    <div key={index} className='relative'> 
                        <div className={'absolute bg-black opacity-20 cursor-pointer ' +(index==over?' opacity-20 ':' hidden ') } onClick={()=>OpenArticle(nowArticle)} onMouseEnter={()=>setOver(index)} onMouseLeave={()=>setOver(-1)} style={{width:w+'px',height:h+'px'}}></div>
                        <img src={nowArticle.img_url} onMouseEnter={()=>setOver(index)} onMouseLeave={()=>setOver(-1)} alt={nowArticle.id} style={{width:w+'px',height:h+'px'}} />
                    </div>
                ))}
                <Modal open={openArticle?.id >=0} onClose={()=>CloseArticle()} className='w-[1400px] h-[900px] flex' escClose={true} outlineClose={true} >
                    <img src={openArticle?.img_url} className='w-[900px] h-[900px]'/>
                    <div id='pbg' className='flex flex-col w-full relative'>
                        <div className='w-full flex justify-between p-2'>
                            <div id='pb-1' className='flex items-center cursor-pointer' onMouseEnter={()=>OpenHoverDropDown(owner,'pbg','pb-1')} onMouseLeave={()=>CloseHoverDropDown()}>
                                <img src={owner.profileImage} className='w-[44px] h-[44px] rounded-full cursor-pointer' alt={owner.username}/>
                                <label className='p-2 cursor-pointer hover:text-gray-400 font-bold'>{owner.username}</label>
                            </div>
                            <img src='/commons/more.png' className='p-2 w-[48px] h-[48px] cursor-pointer'/>
                        </div>
                        <DropDown open={hoverDropDown} onClose={()=>CloseHoverDropDown()} className='bg-base-100 border ' width={400} height={200} defaultDriection={Direcion.DOWN} background={hoverDropDown?.bg} button={hoverDropDown?.b} >
                            <div className='flex flex-col h-[100%]' onMouseEnter={()=>OpenHoverDropDown(hoverDropDown.user,hoverDropDown.bg,hoverDropDown.b)} onMouseLeave={()=>CloseHoverDropDown()}>
                                <div className='flex items-center'>
                                    <img src={hoverDropDown?.user.profileImage} className='rounded-full w-[66px] h-[66px]'/> 
                                    <div className='p-2 flex flex-col justify-center'>
                                        <label className='font-bold text-xl'>{hoverDropDown?.user.username}</label>
                                        <label className='text-gray-500 text-sm'>{hoverDropDown?.user.nickname}</label>
                                    </div> 
                                </div>
                                <div className='flex justify-evenly items-center'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <label>{hoverDropDown?.user.articleCount}</label>
                                        <label>게시물</label>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <label>{hoverDropDown?.user.followers?.length}</label>
                                        <label>팔로워</label>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <label>{hoverDropDown?.user.followings?.length}</label>
                                        <label>팔로잉</label>
                                    </div>
                                </div>
                                {hoverDropDown?.user.username == user?.username ? <button className='btn mt-7 text-lg'>프로필 편집</button> : <button className='btn mt-7 text-lg 'onClick={()=>{follow({username:hoverDropDown?.user.username,follower:user?.username}).then(response=>RefreshArticle(openArticle?.id))}}> {hoverDropDown?.user.followers?.filter((item:any)=>item.follower == user?.username).length>0 ? '팔로우 해제' : '팔로우'}</button>}
                            </div>
                        </DropDown>
                        <div className='divider m-1'></div>
                        <div id='comments' className='flex flex-col w-full h-[650px] overflow-y-scroll'>
                            <label className='pl-2'>{(openArticle?.tags as any[])?.map((tag,index)=><a key={index} href='#' className='text-blue-500'>{'#'+tag}</a>) }</label>
                            <div className='p-2 flex relative'>
                                <img id={'cb-1'} src={owner.profileImage} className='rounded-full w-[44px] h-[44px] cursor-pointer' onMouseEnter={()=>OpenHoverDropDown(owner, 'pbg','cb-1')} onMouseLeave={()=>CloseHoverDropDown()} /> 
                                <div className='flex w-[456px] flex-col justify-center p-2'>
                                    <div><label className='font-bold cursor-pointer]' onMouseEnter={()=>OpenHoverDropDown(owner, 'pbg','cb-1')} onMouseLeave={()=>CloseHoverDropDown()}>{owner.nickname}</label></div>
                                    <label className='w-[400px] break-words'>{openArticle?.content}</label>
                                    <label className='text-xs'><Days dateTime={openArticle?.dateTime}/> </label>
                                </div>
                            </div>
                            {(openArticle?.comments as any[])?.map((comment, index)=>(
                                <div key={index}>
                                    <div className='p-2 flex relative'>
                                        <img id={'cb'+index} src={comment.user.profileImage} className='rounded-full w-[44px] h-[44px] cursor-pointer' onMouseEnter={()=>OpenHoverDropDown(comment.user,'pbg','cb'+index)} onMouseLeave={()=>CloseHoverDropDown()} onClick={()=>{if(comment.user.username != owner.username)window.location.href='/'+comment.user.username;}}/> 
                                        <div className='flex w-[456px] flex-col justify-center p-2'>
                                            <div><label className='font-bold cursor-pointer' onMouseEnter={()=>OpenHoverDropDown(comment.user, 'pbg','cb'+index)} onMouseLeave={()=>CloseHoverDropDown()}>{comment.user.nickname}</label></div>
                                            <label className='w-[400px] break-words'>{comment.comment}</label>
                                            <label className='text-xs'><Days dateTime={comment.dateTime}/> </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <img src={love?.status?'/commons/heart_on.png':'/commons/heart_off.png'} onClick={(e )=>{setLove({id:love.id,status:!love.status}); loveArticle({article_id:openArticle?.id,username:owner.username}).then(()=>RefreshArticle(openArticle?.id))}} className='p-2 w-[40px] h-[40px] cursor-pointer' alt='save'></img>
                                <img src='/commons/link.png'  className='p-2 w-[40px] h-[40px] cursor-pointer' alt='save'></img>
                            </div>
                        <img src='/commons/save_off.png'  className='p-2 w-[40px] h-[40px] cursor-pointer' alt='save'></img>
                        </div>
                        <label className='p-2 text-sm font-bold text-gray-400'><GetDate dateTime={openArticle?.dateTime}/></label>
                        <div className='divider m-1'></div>
                        <EmoteDropDown input_id='text' open={isEmoteOpen} setIsOpen={(v:boolean)=>setIsEmoteOpen(v)} onClick={()=>{const text = document.getElementById('text') as HTMLInputElement; if(text)setSubmitable(text.value.length>0); }} background='pbg' button='eb'/>
                        <div className='p-2 flex'>
                            <EmoteButton id='eb' open={isEmoteOpen} setIsOpen={(v:boolean)=>setIsEmoteOpen(v)}/>
                            <input className='w-[400px] p-2' type='text' id='text' maxLength={255} placeholder='댓글 달기...' onKeyDown={(e)=>{if(e.key=='Enter') document.getElementById('text_button')?.click(); setSubmitable((e.target as HTMLInputElement).value.length >0);}} onKeyUp={(e)=>{ setSubmitable((e.target as HTMLInputElement).value.length >0);} }/>
                            <button disabled={!submitable} id='text_button' className={'p-2 text-center font-bold ' + (submitable?'text-blue-500':'text-gray-500')} onClick={()=>{ const text = (document.getElementById('text') as HTMLInputElement); writeComment({article_id: openArticle.id, comment: text.value}).then(() => RefreshArticle(openArticle?.id)); text.value=''; setSubmitable(false); }} >게시</button>
                        </div>
                    </div>
                </Modal>
                {isLoading?<div className='w-full flex justify-center'> <img src="/commons/loading.png" style={{width:50+'px',height:50+'px'}}/> </div>:null}
            </div>
        :
            <></>
        }
    </>;
}