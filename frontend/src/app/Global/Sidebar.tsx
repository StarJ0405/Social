'use client';
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUser,saveArticleTempImage,writeArticle } from '@/app/API/UserAPI';
import Modal from '@/app/Global/Modal'
import {EmoteDropDown,EmoteButton} from '@/app/Global/Emotes'
import { fetchnonUsers } from '../API/NonUserAPI';



export default function Sidebar(){
    const [status, setStatus] = useState(0);
    const [isFold, setIsFold] = useState(false);
    const [isDrag, setIsDrag] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
    const [user, setUser] = useState(null as any);
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
    const [articleTempImage, setArticleTmepImage] = useState(null);
    const [tags,setTags] = useState([] as String[]);
    const [visibility, setVisibility] = useState(0);
    const [hideLoveAndShow, setHideLoveAndShow] = useState(false);
    const [preventComment, setPreventComment] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [sideSearchedUsers,setSideSearchedUsers] = useState(null as unknown as any[]);
    const [sideSearchInterval,setSideSearchInterval] = useState(null as any);
    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
            }).catch((error) => {
                console.log(error);
            });
        } else
            redirect('/account/login');
    }, [ACCESS_TOKEN]);
    useEffect(() => {
        const updateWidth = () => {
            setIsFold(window.innerWidth < 1250);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const upload = async(file:any) => {
        const formData = new FormData();
        formData.append('file',file);
        setArticleTmepImage(await saveArticleTempImage(formData));
        setIsDrag(false);
        setContent('');
        setIsTagOpen(false);
        setIsAdvanceOpen(false);
        setTags([] as String[]);
        setHideLoveAndShow(false);
        setPreventComment(false);
        setVisibility(0);
    }
    function Profile() {
        return (
            <div className='avatar w-[44px] h-[44px]'>
                <div className='w-24 rounded-full'>
                    <img id='mini_profile_img' src={user?.profileImage} className='w-[24px] h-[24px]' alt='profile' />
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
            <div className='dropdown dropdown-top mt-auto'>
              <div tabIndex={0} role='button' className='btn mb-3 w-full'><svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 m-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7' /></svg>더 보기</div>
              <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                <li><a>설정</a></li>
                <li><a>모드 전환</a></li>
                <li><a onClick={handleLogout}>로그아웃</a></li>
              </ul>
            </div>
        );
    }
    function Logo(){
        if(isFold||status!=0)
            return <img src='/commons/logo_small.png' className='w-[44px] h-[44px]' alt='logo small'/>;
        else
            return <img src='/commons/logo_big.png' className='w-[150px]' alt='logo big'/>;
    }
    function Icon({name}:{name:string}){
        if(isFold||status!=0)
            return null;
        else
            return <span className='pl-3'>{name}</span>;
    }
    function SideSearch(e:any){
        const value = e?.value;
        if(value && value.length!=0){
            if(sideSearchInterval)
                clearInterval(sideSearchInterval);
            const timer = setInterval(()=> {
                fetchnonUsers(value,user.username).then(response=>{
                    setSideSearchedUsers(response);
                    setSideSearchInterval(null);
                }).catch(error=>{console.log(error); setSideSearchInterval(null);})
                clearInterval(timer);
            },3000);
            setSideSearchInterval(timer);
        }else{
            clearInterval(sideSearchInterval);
            setSideSearchInterval(null);
            setSideSearchedUsers(null as unknown as any[]);
        }
    }

   

    return (<><p className={'h-screen '+(isFold?' min-w-[120px] ' :' min-w-[300px] ')}></p>
        <div className={'fixed sidebar h-screen flex w-[500px] z-[5]'}>
            <div className={'h-screen border-r-2 flex flex-col justify-start '+ (isFold||status!=0?'w-[120px]' :'w-[300px]')}>
                <div className='logo w-full h-[100px] pl-5 flex justify-start items-center'>
                    <a href='/'>
                        <Logo/>
                </a>
                </div>
                <div className='home flex w-full h-[60px] pl-5 mb-3 items-center'>
                    <a href='/'>
                        <img src='/commons/home.png' className='w-[44px] h-[44px]' alt='home' />
                    </a>
                    <a href='/'>
                        <Icon name='홈'/>
                    </a>
                </div>
                <div className='search flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer'>
                    <a onClick={()=>setStatus(1)}>
                        <img src='/commons/search.png' className='w-[44px] h-[44px]' alt='search'/>
                    </a>
                    <a onClick={()=>setStatus(1)}>
                        <Icon name='검색'/>
                    </a>
                </div>
                <div className='explore flex w-full h-[60px] pl-5 mb-3 items-center'>
                    <a href='/'>
                        <img src='/commons/explore.png' className='w-[44px] h-[44px]' alt='explore'/>
                    </a>
                    <a href='/'>
                        <Icon name='탐색'/>
                    </a>
                </div>
                <div className='message flex w-full h-[60px] pl-5 mb-3 items-center'>
                    <a href='/direct'>
                        <img src='/commons/message.png' className='w-[44px] h-[44px]' alt='message' />
                    </a>
                    <a href='/direct'>
                        <Icon name='메시지'/>
                    </a>
                </div>
                <div className='alarm flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer'>
                    <a onClick={()=>setStatus(2)}>
                        <img src='/commons/alarm.png' className='w-[44px] h-[44px]' alt='alarm'/>
                    </a>
                    <a onClick={()=>setStatus(2)}>
                        <Icon name='알림'/>
                    </a>
                </div>
                <div className='create flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer'>
                    <a onClick={() => { setIsModalOpen(true); setIsArticleModalOpen(false); setArticleTmepImage(null); } } className='flex items-center'>
                        <img src='/commons/create.png' className='w-[44px] h-[44px]' alt='create'/>
                        <Icon name='만들기'/>
                    </a>
                </div>
                <Modal open={isArticleModalOpen} onClose={()=>setIsArticleModalOpen(false)} className='flex flex-col w-[400px] h-[200px] justify-center items-center' escClose={true} outlineClose={true}>
                    <label className='text-xl'>게시물을 삭제하시겠어요?</label>
                    <label className='text-sm text-gray-500'>지금 나가면 수정 내용이 저장되지 않습니다.</label>
                    <div className='divider m-1'></div>
                    <label className='text-red-500 cursor-pointer' onClick={()=>{setIsArticleModalOpen(false); setArticleTmepImage(null);}  }>삭제</label>
                    <div className='divider m-1'></div>
                    <label className='cursor-pointer' onClick={()=>{setIsArticleModalOpen(false);} }>취소</label>
                </Modal>
                <Modal open={isModalOpen} onClose={() => {const article_temp_img = document.getElementById('article_temp_img'); 
                    if(article_temp_img==null) setIsModalOpen(false); else setIsArticleModalOpen(true); } } 
                        className='flex flex-col w-[1100px] h-[800px] justify-start items-center' escClose={true} outlineClose={true}>
                        {
                            articleTempImage==null?
                            (<>
                                <label className='font-bold text-lg w-full h-[24px] text-center mt-4'>새 게시물 만들기</label>
                                <div className='divider m-1'></div>
                                    <div className={'flex h-full w-full flex-col justify-center items-center font-bold text-2xl '+(isDrag ?' bg-gray-400':'')} onDragOver={(e)=>{e.preventDefault(); setIsDrag(true)}} onDragEnd={(e) => {e.preventDefault();setIsDrag(false);}} onDragLeave={(e)=>setIsDrag(false)} 
                                        onDrop={(e)=>{
                                            e.preventDefault(); setIsDrag(false); 
                                            if (e.dataTransfer.items) {
                                                if(e.dataTransfer.items.length==1)
                                                    upload(e.dataTransfer.items[0].getAsFile());
                                                else
                                                    alert('파일을 한개만 올려주세요.');
                                            }
                                        }}>
                                            <img src='/commons/picture.png' className='w-[96px] h-[96px] m-3'/>
                                        <label>사진을 여기에 끌어다 놓으세요</label>
                                        <button className='btn btn-sm btn-info text-white m-3' onClick={()=>{const article_img = document.getElementById('article_img'); if(article_img) article_img.click();}}>컴퓨터에서 선택</button>
                                        <input id='article_img' type='file' className='hidden' onChange={(e)=>{ if(e!=null&&e.target!=null&&e.target.files!=null)upload(e.target.files[0])}}/>
                                    </div>
                            </>)
                            :
                            (<>
                                <div className='flex justify-between w-full items-center'>
                                    <label className='text-red-400 w-[40px] items-center mt-4 ml-4 cursor-pointer' onClick={() => setIsArticleModalOpen(true) }>취소</label>
                                    <label className='font-bold text-lg w-full h-[24px] text-center mt-4'>새 게시물 만들기</label>
                                    <label className='text-blue-400 w-[80px] mt-4 mr-4 cursor-pointer font-bold' onClick={()=>{
                                        console.log({
                                            content,
                                            tags,
                                            visibility,
                                            hideLoveAndShow,
                                            preventComment,
                                            articleTempImage
                                        });
                                    writeArticle({content,tags,visibility,hideLoveAndShow,preventComment,img_url:articleTempImage});
                                    setIsModalOpen(false);
                                    }} >공유하기</label>
                                </div>
                                <div className='divider m-1'></div>
                                <div className='flex w-full'>
                                    <img id='article_temp_img' src={articleTempImage} className='w-[750px] h-[750px]'/>
                                    <div className='w-full h-full felx flex-col p-2'>
                                        <div className='flex items-center p-2'>
                                            <Profile /> <label className='p-2'>{user?.nickname}</label>
                                        </div>
                                        <div>
                                            <div className='flex flex-col'>
                                                <textarea id='text' className='w-full h-[200px] resize-none outline-none overflow-y-scroll' maxLength={2200} placeholder='문구를 입력하세요...' onKeyDown={(e:any)=>{const value = e.target.value as string; setContent(value?value:'');}} onKeyUp={(e:any)=>{const value = e.target.value as string; setContent(value?value:'');}}></textarea>
                                                <div id='ebg' className='flex justify-between relative'>
                                                    <EmoteButton id='eb' open={isOpen} setIsOpen={(v:boolean)=>setIsOpen(v)} />
                                                    <EmoteDropDown input_id='text' open={isOpen} setIsOpen={(v:boolean)=>setIsOpen(v) } background='ebg' button='eb'/>
                                                    <label>{content.length}/2200</label> 
                                                </div>
                                            </div>
                                            <div className='divider m-1'></div>
                                            <div >
                                                <div className='w-full p-2'><a className='flex justify-between cursor-pointer' onClick={()=>setIsTagOpen(!isTagOpen)}><label className='cursor-pointer'>태그 설정</label><label className='cursor-pointer' >{isTagOpen? '▲':'▼'}</label></a></div>
                                                {isTagOpen?
                                                    <>
                                                        <div className='w-full p-2 flex flex-wrap'>
                                                            {tags.map((tag, index) => (<button className='btn' key={index} onClick={()=>{const new_tags = [] as String[]; for(let i=0; i<tags.length;i++)if(tags[i]!=tag)new_tags.push(tags[i]); setTags(new_tags);}}>{tag}</button>))} 
                                                        </div>
                                                        <div className='w-full p-2'>
                                                            <input type='text' id='tag' maxLength={30} placeholder='태그 추가' onKeyDown={(e)=>{if(e.key=='Enter')document.getElementById('add_tag')?.click()}}/>
                                                            <button id='add_tag' className='cursor-pointer' onClick={()=>{const tag = document.getElementById('tag') as HTMLInputElement; if(tag&&tag.value){if(!tags.includes(tag.value)){const new_tags = [] as String[]; new_tags.push(...tags); new_tags.push(tag.value); setTags(new_tags);} tag.value='';} }}>추가하기</button>
                                                        </div>
                                                    </>
                                                : <></>}
                                            </div>
                                            <div className='divider m-1'></div>
                                            <div>
                                                <div className='w-full p-2'><a className='flex justify-between cursor-pointer' onClick={()=>setIsAdvanceOpen(!isAdvanceOpen)}><label className='cursor-pointer'>고급 설정</label><label className='cursor-pointer' >{isAdvanceOpen? '▲':'▼'}</label></a></div>
                                                {isAdvanceOpen?
                                                    <>
                                                        <div className='w-full p-2 flex justify-between items-center'>
                                                            <label>공개 범위 설정</label>
                                                            <select onChange={(e)=>setVisibility(e.target.value as unknown as number)} className='select select-bordered select-sm text-xs text-center w-[160px] max-w-xs'>
                                                                <option value={0}>모두 공개</option>
                                                                <option value={1}>팔로워에게 공개</option>
                                                                <option value={2}>맞팔로워에게 공개</option>
                                                                <option value={3}>비공개</option>
                                                            </select>
                                                        </div>
                                                        <div className='w-full p-2 flex items-center justify-between'>
                                                            <label>좋아요 수 및 조회수 숨기기</label> <input type='checkbox' onChange={(e)=>{setHideLoveAndShow(e.target.checked)}} className='toggle' />
                                                        </div>
                                                        <div className='w-full p-2 flex items-center justify-between'>
                                                            <label>댓글 기능 해제</label> <input type='checkbox' onChange={(e)=>{setPreventComment(e.target.checked)}} className='toggle' />                                                        
                                                        </div>
                                                    </>
                                                :<></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                </Modal>
                <div className='profile flex w-full h-[60px] pl-5 mb-3 items-center'>
                    <a className='flex items-center' href={'/'+user?.username}>
                        <Profile />
                        <Icon name='프로필'/>
                    </a>
                </div>
                <More />
            </div>
            {status==1?
                <div className={'bg-base-100 h-screen border-r-2 flex flex-col justify-start w-full'}>
                    <label className='p-5 text-2xl font-bold'>검색</label>
                    <input id="side_search" type="text" className='input input-bordered input-accent w-full max-w-xs self-center' placeholder='검색' onChange={(e)=>SideSearch(e.target)}/>
                    <div className='divider mt-3 mb-1'></div>
                    <div className='overflow-y-scroll h-full'>
                        {sideSearchInterval?
                            <></>
                        :sideSearchedUsers && sideSearchedUsers.length!=0?
                            <>{sideSearchedUsers.map((u,index)=>
                                <div key={index} className='cursor-pointer hover:bg-base-300 flex my-2 px-5' onClick={()=>location.href="/"+u?.username}>
                                    <img src={u?.profileImage} className='rounded-full my-2' style={{width:44+'px',height:44+'px'}}/>
                                    <div className='flex flex-col justify-center mx-2'>
                                        <label className='text-sm cursor-pointer'>{u?.nickname}</label>
                                        <label className='text-sm cursor-pointer'>{u?.username}</label>
                                    </div>
                                </div>
                            )}</>
                        :
                            <label className='mx-5 text-gray-500 text-sm'>계정을 찾을 수 없습니다.</label>
                        }
                    </div>
                </div>
            :status==2?
                <div className={'bg-base-100 h-screen border-r-2 flex flex-col justify-start w-full'}>
                    <label className='p-5 text-2xl font-bold'>알림</label>
                    <div className='flex flex-col self-center items-center w-[300px] text-sm text-center'>
                        <img src="/commons/activity.png" style={{width:64+'px',height:64+'px'}}></img>
                        <label className='p-2'>게시물 활동</label>
                        <label className='p-2'>다른 사람이 회원님의 게시물을 좋아하거나 댓글을 남기면 여기에 표시됩니다.</label>
                    </div>
                </div>
            :
                <></>
            }
        </div>
        {status!=0?<div className={'fixed right-0 h-screen z-[5]'} style={{width:(window.innerWidth-515+'px')}} onClick={()=>setStatus(0)}></div>:null}
    </>);
}