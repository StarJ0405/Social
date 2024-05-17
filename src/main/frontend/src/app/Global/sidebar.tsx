"use client";
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUser,UserApi } from '@/app/api/UserAPI';
import Modal from "@/app/global/Modal"
import {EmoteDropDown} from "@/app/global/Emotes"
export default function Sidebar(){
    const [width, setWidth] = useState(0);
    const [isFold, setIsFold] = useState(false);
    const [isDrag, setIsDrag] = useState(false);
    const [count, setCount] = useState(0);
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
    const [user, setUser] = useState({
        profileImage:'',
        nickname:'',
        username:''
    });
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
    const [articleTempImage, setArticleTmepImage] = useState(null);
    const [tags] = useState([] as String[]);
    
    const upload = async(e:any) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("file",file);
        const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
        await UserApi.post('/api/file/temp_article', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=> {
            setArticleTmepImage(response.data);
        })
        .catch(error=>{console.log(error);});
    }
    function Profile() {
        return (
            <div className="avatar w-[44px] h-[44px]">
                <div className="w-24 rounded-full">
                    <img id="mini_profile_img" src={user.profileImage?user.profileImage:'/commons/basic_profile.png'} className="w-[24px] h-[24px]" alt="profile" />
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
              <div tabIndex={0} role="button" className="btn mb-3 w-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>더 보기</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>설정</a></li>
                <li><a>모드 전환</a></li>
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
    useEffect(() => {
        const updateCount = (e:any) => {
            const value = e.target.value as string;
            setCount(value?value.length:0);
        };
        window.addEventListener('keydown', updateCount);
        return () => window.removeEventListener('keydown', updateCount);
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
                <Icon name="검색"/>
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
                <a onClick={() => { setIsModalOpen(true); setIsArticleModalOpen(false); } } className="flex items-center">
                    <img src="/commons/create.png" className="w-[44px] h-[44px]" alt="create"/>
                    <Icon  name="만들기"/>
                </a>
            </div>
            <Modal open={isArticleModalOpen} onClose={()=>setIsArticleModalOpen(false)} className="flex flex-col w-[400px] h-[200px] justify-center items-center" escClose={true} outlineClose={true}>
                <label className="text-xl">게시물을 삭제하시겠어요?</label>
                <label className="text-sm text-gray-500">지금 나가면 수정 내용이 저장되지 않습니다.</label>
                <div className="divider m-1"></div>
                <label className="text-red-500 cursor-pointer" onClick={()=>{setIsArticleModalOpen(false); setArticleTmepImage(null);}  }>삭제</label>
                <div className="divider m-1"></div>
                <label className="cursor-pointer" onClick={()=>{setIsArticleModalOpen(false);} }>취소</label>
            </Modal>
            <Modal open={isModalOpen} onClose={() => {const article_temp_img = document.getElementById('article_temp_img'); 
                if(article_temp_img==null) setIsModalOpen(false); else setIsArticleModalOpen(true); } } 
                    className="flex flex-col w-[1100px] h-[800px] justify-start items-center" escClose={true} outlineClose={true}>
                    {
                        articleTempImage==null?
                        (<>
                            <label className="font-bold text-lg w-full h-[24px] text-center mt-4">새 게시물 만들기</label>
                            <div className="divider m-1"></div>
                                <div className={"flex h-full w-full flex-col justify-center items-center font-bold text-2xl "+(isDrag ?" bg-gray-400":"")} onDragOver={(e)=>{e.preventDefault(); setIsDrag(true)}} onDragEnd={(e) => {e.preventDefault();setIsDrag(false);}} onDragLeave={(e)=>setIsDrag(false)} 
                                    onDrop={(e)=>{
                                        e.preventDefault(); setIsDrag(false); 
                                        if (e.dataTransfer.items) {
                                            if(e.dataTransfer.items.length==1){
                                                const formData = new FormData();
                                                const file = e.dataTransfer.items[0].getAsFile() as any;
                                                formData.append("file",file);
                                                const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
                                                UserApi.post('/api/file/temp_article', formData, {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                                }).then(response=> {
                                                    setArticleTmepImage(response.data);
                                                })
                                                .catch(error=>{console.log(error);});
                                                setIsDrag(false);
                                                setCount(0);
                                                setIsTagOpen(false);
                                                setIsAdvanceOpen(false);
                                            }else
                                                alert('파일을 한개만 올려주세요.');
                                        }
                                    }}>
                                        <img src="/commons/picture.png" className="w-[96px] h-[96px] m-3"/>
                                    <label>사진을 여기에 끌어다 놓으세요</label>
                                    <button className="btn btn-sm btn-info text-white m-3" onClick={()=>{const article_img = document.getElementById('article_img'); if(article_img) article_img.click();}}>컴퓨터에서 선택</button>
                                    <input id="article_img" type="file" className="hidden" onChange={upload}/>
                                </div>
                        </>)
                        :
                        (<>
                            <div className="flex justify-between w-full items-center">
                                <label className="text-red-400 w-[40px] items-center mt-4 ml-4 cursor-pointer" onClick={() => setIsArticleModalOpen(true) }>취소</label>
                                <label className="font-bold text-lg w-full h-[24px] text-center mt-4">새 게시물 만들기</label>
                                <label className="text-blue-400 w-[80px] mt-4 mr-4 cursor-pointer font-bold" onClick={()=>{}} >공유하기</label>
                            </div>
                            <div className="divider m-1"></div>
                            <div className="flex w-full">
                                <img id="article_temp_img" src={articleTempImage} className="w-[750px] h-[750px]"/>
                                <div className="w-full h-full felx flex-col p-2">
                                    <div className="flex items-center p-2">
                                        <Profile /> <label className="p-2">{user.nickname}</label>
                                    </div>
                                    <div>
                                        <div className="flex flex-col">
                                            <textarea id="text" className="w-full h-[200px] resize-none outline-none overflow-y-scroll" maxLength={2200} placeholder="문구를 입력하세요..."></textarea>
                                            <div className="flex justify-between">
                                                <EmoteDropDown input={document.getElementById('text') as HTMLInputElement} />
                                                <label>{count}/2200</label> 
                                            </div>
                                        </div>
                                        <div className='divider m-1'></div>
                                        <div >
                                            <div className='w-full p-2'><a className='flex justify-between cursor-pointer' onClick={()=>setIsTagOpen(!isTagOpen)}><label className='cursor-pointer'>태그 설정</label><label className='cursor-pointer' >{isTagOpen? "▲":"▼"}</label></a></div>
                                            {isTagOpen?  tags.map((tag, index) => (<button className='btn' key={index} >{tag}</button>)) :<></>}
                                            {isTagOpen? <div className='p-2'><input type="text" id="tag" placeholder='태그 추가'/> <button className='cursor-pointer' onClick={()=>{const tag = document.getElementById('tag') as HTMLInputElement; if(tag&&tag.value){if(!tags.includes(tag.value))tags.push(tag.value); tag.value='';} }}>추가하기</button></div> : <></>}
                                        </div>
                                        <div className='divider m-1'></div>
                                        <div>
                                        <div className='w-full p-2'><a className='flex justify-between cursor-pointer' onClick={()=>setIsAdvanceOpen(!isAdvanceOpen)}><label className='cursor-pointer'>고급 설정</label><label className='cursor-pointer' >{isTagOpen? "▲":"▼"}</label></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                    }
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