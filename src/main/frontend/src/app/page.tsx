'use client'
import Main from '@/app/global/main';
import { useEffect, useState } from 'react';
import { fetchnonRecentUsers } from './API/NonUserAPI';
import { fetchUser, follow } from './api/UserAPI';
import { redirect } from 'next/navigation';

export default function Home() {
    const [user,setUser] = useState(null as any);
    const [recent,setRecent] = useState(null as unknown as any[])
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
                fetchnonRecentUsers(response.username).then(r => {
                    console.log(r);
                    setRecent(r);
                }).catch(e => console.log(e));
            }).catch((error) => console.log(error));
        } else
            redirect('/account/login');
    }, [ACCESS_TOKEN]);
    

    
      return (
           <Main>
               <div className='h-full flex flex-col items-center my-4'>
                    <label className='font-bold text-2xl'>회원님을 위한 추천</label>
                    {recent?.map((u,index)=>
                        <div key={index} className='cursor-pointer hover:bg-base-300 flex items-center my-2 px-5 w-[400px] justfit-start relative'>
                            <img src={u?.profileImage} className='rounded-full my-2' style={{width:44+'px',height:44+'px'}}/>
                            <div className='flex flex-col justify-center mx-2 w-full' onClick={()=>location.href="/"+u?.username}>
                                <label className='text-sm cursor-pointer' onClick={()=>location.href="/"+u?.username}>{u?.nickname}</label>
                                <label className='text-sm cursor-pointer' onClick={()=>location.href="/"+u?.username}>{u?.username}</label>
                            </div>
                            <button className='btn btn-info hover:bg-blue-500 text-white btn-sm font-bold' onClick={()=>{
                                follow({username:u.username,follower:user.username}).then(response=>{
                                    window.location.reload();
                                })
                            }}>팔로우</button>
                        </div>
                    )}
               </div>
           </Main>
      );

}
