'use client'
import Main from '@/app/Global/main';
import { useEffect, useState } from 'react';
import { fetchnonRecentUsers } from './API/NonUserAPI';
import { fetchUser, follow } from './API/UserAPI';
import { redirect } from 'next/navigation';
import DropDown, { Direcion } from './Global/DropDown';


export default function Home() {
    const [user,setUser] = useState(null as any);
    const [recent,setRecent] = useState(null as unknown as any[])
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    const[userHover,setUserHover] = useState(null as any);
    const[userHoverInterval, setUserHoverInterval] = useState(null as any);
    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
                fetchnonRecentUsers(response.username).then(r => {
                    setRecent(r);
                }).catch(e => console.log(e));
            }).catch((error) => console.log(error));
        } else
            redirect('/account/login');
    }, [ACCESS_TOKEN]);
    
    function OpenUserHover(user:any, bg:string, b:string){
        if(userHoverInterval)
            clearInterval(userHoverInterval);
        setUserHover({user:user,bg:bg,b:b});
        setUserHoverInterval(null);
    }
    function CloseUserHover(){
        if(userHoverInterval)
            clearInterval(userHoverInterval);
        const time = setInterval(()=>{
            setUserHover(null); clearInterval(time); setUserHoverInterval(null)
        },1500);
        setUserHoverInterval(time);
    }
    
    
      return (
           <Main>
               <div className='h-full flex flex-col items-center my-4 relative ' id='hbg'>
                    <label className='font-bold text-2xl'>회원님을 위한 추천</label>
                    {recent?.map((u,index)=>
                        <div key={index} className='cursor-pointer hover:bg-base-300 flex items-center my-2 px-5 w-[400px] justfit-start relative'>
                            <img src={u?.profileImage} className='rounded-full my-2' style={{width:44+'px',height:44+'px'}} onMouseEnter={()=>OpenUserHover(u,'hbg','hb'+index)} onMouseLeave={()=>CloseUserHover()}/>
                            <div id={'hb'+index} className='flex flex-col justify-center mx-2 w-full' onClick={()=>location.href="/"+u?.username}>
                                <label className='text-sm cursor-pointer' onClick={()=>location.href="/"+u?.username}>{u?.nickname}</label>
                                <label className='text-sm cursor-pointer' onClick={()=>location.href="/"+u?.username}>{u?.username}</label>
                            </div>
                            <button className='btn btn-info hover:bg-blue-500 text-white btn-sm font-bold' onClick={()=>{
                                follow({username:u?.username,follower:user?.username}).then(response=>{
                                    window.location.reload();
                                })
                            }}>팔로우</button>
                        </div>
                    )}
                    <DropDown open={userHover}  onClose={()=>CloseUserHover()} className=' bg-base-100 border ' width={400} height={200} defaultDriection={Direcion.DOWN} background={userHover?.bg} button={userHover?.b} x={320}>
                        <div className='flex flex-col h-[100%]' onMouseEnter={()=>OpenUserHover(userHover?.user,userHover?.bg,userHover?.b)} onMouseLeave={()=>CloseUserHover()}>
                            <div className='flex items-center'>
                                <img src={userHover?.user.profileImage} className='rounded-full w-[66px] h-[66px]'/> 
                                <div className='p-2 flex flex-col justify-center'>
                                    <label className='font-bold text-xl'>{userHover?.user.username}</label>
                                    <label className='text-gray-500 text-sm'>{userHover?.user.nickname}</label>
                                </div> 
                            </div>
                            <div className='flex justify-evenly items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <label>{userHover?.user.articleCount}</label>
                                    <label>게시물</label>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <label>{userHover?.user.followers?.length}</label>
                                    <label>팔로워</label>
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <label>{userHover?.user.followings?.length}</label>
                                    <label>팔로잉</label>
                                </div>
                            </div>
                            <button className='btn mt-7 text-lg 'onClick={()=>{follow({username:userHover?.user.username,follower:user?.username}).then(response=>window.location.reload())}}>팔로우</button>
                        </div>
                    </DropDown>
               </div>
           </Main>
      );

}
