'use client';

import { redirect, useSearchParams } from "next/navigation";
import Main from "../Global/main";
import { useEffect, useState } from "react";
import { fetchExplore } from "../Global/API/NonUserAPI";
import { fetchUser } from "../Global/API/UserAPI";


export default function Home() {
    const [explores, setExplores] = useState([] as any[]);
    const [page, setPage] = useState(0);
    const [user, setUser] = useState(null as any);
    const [last, setLast] = useState(false);
    const [loading, setLoading] = useState(false);
    const ACCESS_TOKEN = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
                .then((response) => {
                    setUser(response);
                    fetchExplore({ username: response.username, page: page }).then(r => setExplores(r)).catch(e => console.log(e));
                }).catch((error) => {
                    console.log(error);
                });
        } else
            redirect('/account/login');
    }, [ACCESS_TOKEN]);
    useEffect(() => {
        const scroll = async () => {
            if (!last && !loading && window.document.body.scrollHeight - window.innerHeight == window.scrollY) {
                setLoading(true);
                fetchExplore({ username: user.username, page: page + 1 }).then(r => {
                    if (r.length == 0) {
                        setLast(true);
                        setLoading(false);
                        return;
                    }
                    setExplores([...explores, ...r]);
                    setPage(page + 1);
                    const interval = setInterval(() => { setLoading(false); clearInterval(interval) }, 200);
                }).catch(e => {
                    console.log(e);
                    setLoading(false);
                });
            }
        };
        window.addEventListener('scroll', scroll);
        return () => window.removeEventListener('scroll', scroll);
    })
    console.log(explores)
    return <Main>
        <div className="flex flex-col items-center">
            {explores.map((explore, index) => <div key={index} className="flex border-2 m-4 w-[600px] h-[300px] cursor-pointer" onClick={()=>{}}>
                <img src={explore.img_url} className="w-[300px] cursor-pointer" />
                <div className="p-4 border-l-2 flex flex-col w-[300px]">
                    <div className="h-[200px]">
                        {explore.content}
                    </div>
                    <div className="h-[100px] overflow-y-auto py-2">
                        {(explore.tags as any[]).map((tag, index) => <label className="border-2 p-1 border-gray-500 rounded-lg" key={index}>{tag}</label>)}
                    </div>
                </div>
            </div>)}
        </div>
    </Main>
}   
