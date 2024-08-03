'use client'
import { InputHTMLAttributes, useEffect, useState } from 'react';
import { createRoom, fetchUser, getRooms, saveArticleTempImage, writeArticle } from '../API/UserAPI';
import { redirect } from 'next/navigation';
import Modal from '../Global/Modal';
import { EmoteButton, EmoteDropDown } from '../Global/Emotes';
import { fetchnonUsers } from '../API/NonUserAPI';
import { Days, GetDate } from '../[username]/CSR';
import { unsubscribe, getSocket, subscribe, publish  } from '../API/SocketAPI';





export default function Home(){
    const [Socket, setSocket] = useState(null as any);
    const [status, setStatus] = useState(0);
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
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [searchedUsers,setSearchedUsers] = useState(null as unknown as any[]);
    const [selectedUsers,setSelectedUsers]  = useState(null as unknown as any[]);
    const [searchInterval,setSearchInterval] = useState(null as any);
    const [isCreateingRomm, setIsCreateingRomm] = useState(false);
    const [room,setRoom] = useState(null as any);
    const [isEmoteDropDownOpen, setIsEmoteDropDownOpen] = useState(false);
    const [rooms, setRooms] = useState(null as unknown as any[]);
    const [replaceRoom, setReplaceRoom] = useState(null as any);
    const [sideSearchedUsers,setSideSearchedUsers] = useState(null as unknown as any[]);
    const [sideSearchInterval,setSideSearchInterval] = useState(null as any);
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

    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
                setSocket(getSocket(response.username));
                getRooms({username:response.username})
                .then(response => {
                    setRooms(response);
                }).catch(error=> console.log(error));
            }).catch((error) => {
                console.log(error);
            });
        } else
            redirect('/account/login');
    }, [ACCESS_TOKEN]);
    useEffect(()=>{
        if(room?.id==replaceRoom?.id){
            setRoom(replaceRoom)
            setReplaceRoom(null)
            const time = setInterval(()=>{
                const element = document.getElementById('chatSpace');
                if(element)
                    element.scrollTop = element.scrollHeight+9999;
                clearInterval(time);
            },10)
        }
    },[replaceRoom]);
    function SetRoom(newRoom:any){
        if(room)
            unsubscribe(Socket,'/sub/talk/'+room.id);
        setRoom(newRoom)
        subscribe(Socket,'/sub/talk/'+newRoom.id,(e:any)=>{ const list = JSON.parse(e.body);setRooms(list); setReplaceRoom(list.filter((r:any)=>{if(r.id==newRoom.id) return r;})[0]) });
        const time = setInterval(()=>{
            const element = document.getElementById('chatSpace');
            if(element)
                element.scrollTop = element.scrollHeight+9999;
            clearInterval(time);
        },10)
        
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
        return <img src='/commons/logo_small.png' className='w-[44px] h-[44px]' alt='logo small'/>;
    }

    function openMessage(){
        setIsMessageModalOpen(true);
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
    function Extra(){
        return (
            <></>);        
    }
    function Search(e:any){
        const value = e?.value;
        if(value&&value.length !=0){
            if(searchInterval)
                clearInterval(searchInterval);
            const timer = setInterval(() => {
                fetchnonUsers(value,user.username).then(response=>{
                    setSearchedUsers(response);
                    setSearchInterval(null);
                }).catch(error=>{console.log(error); setSearchInterval(null);});
                clearInterval(timer);
            }, 3000);
            setSearchInterval(timer);
        }else{
            clearInterval(searchInterval);
            setSearchInterval(null);
            setSearchedUsers(null as unknown as any[]);
        }
    }
    function CreateRoom(){
        const data = selectedUsers?.map(user=>user.username as string) as string[];
        if(data&&!isCreateingRomm){
            setIsCreateingRomm(true);
            createRoom({participants:[...data,user.username]}).then(response => {
                if(isMessageModalOpen)
                    SetRoom(response);
                setIsMessageModalOpen(false);
                setSelectedUsers(null as unknown as any[]);
                setSearchedUsers(null as unknown as any[]);
                setIsCreateingRomm(false);
            }).catch(error=>{
                console.log(error)
                setIsCreateingRomm(false);
            });
        }
    }
    function closeMessageModal(){
        setIsMessageModalOpen(false);
        setSelectedUsers(null as unknown as any[]);
        setSearchedUsers(null as unknown as any[]);
        setIsCreateingRomm(false);
    }
    function Send(){
        const text = (document.getElementById('message_text') as HTMLInputElement);
        publish(Socket, '/pub/talk/'+room.id, {sender: user.username ,message: text.value,urls: [] as String[],createDate: new Date()});
        text.value=''; 
    }
    return ( 
    <main className='flex'>
        <p className={'h-screen min-w-[500px]'}></p>
            <div className={'fixed sidebar h-screen flex w-[500px] z-[5]'}>
                <div className={'h-screen border-r-2 flex flex-col justify-start w-[120px]'}>
                    <div className='logo w-full h-[100px] pl-5 flex justify-start items-center'>
                        <a href='/'>
                            <Logo/>
                    </a>
                    </div>
                    <div className='home flex w-full h-[60px] pl-5 mb-3 items-center'>
                        <a href='/'>
                            <img src='/commons/home.png' className='w-[44px] h-[44px]' alt='home' />
                        </a>
                    </div>
                    <div className='search flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer'>
                        <a onClick={()=>setStatus(1)}>
                            <img src='/commons/search.png' className='w-[44px] h-[44px]' alt='search'/>
                        </a>
                    </div>
                    <div className='explore flex w-full h-[60px] pl-5 mb-3 items-center'>
                        <a href='/'>
                            <img src='/commons/explore.png' className='w-[44px] h-[44px]' alt='explore'/>
                        </a>
                    </div>
                    <div className='message flex w-full h-[60px] pl-5 mb-3 items-center'>
                        <a href='/direct'>
                            <img src='/commons/message.png' className='w-[44px] h-[44px]' alt='message' />
                        </a>
                    </div>
                    <div className='alarm flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer'>
                        <a onClick={()=>setStatus(2)}>
                            <img src='/commons/alarm.png' className='w-[44px] h-[44px]' alt='alarm'/>
                        </a>
                    </div>
                    <div className='create flex w-full h-[60px] pl-5 mb-3 items-center cursor-pointer'>
                        <a onClick={() => { setIsModalOpen(true); setIsArticleModalOpen(false); setArticleTmepImage(null); } } className='flex items-center'>
                            <img src='/commons/create.png' className='w-[44px] h-[44px]' alt='create'/>
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
                        </a>
                    </div>
                    <More />
                </div>
                {
                    status==0?
                    <div className='h-screen border-r-2 flex flex-col justify-start w-full bg-base-500'>
                        <div className='flex justify-between m-8 mb-5 items-center'><label className='text-4xl font-bold'>{user?.username}</label> <img src='/commons/open_message.png' className='cursor-pointer' onClick={()=>openMessage()} style={{width:24+'px',height:24+'px'}}/></div>
                        <div className='overflow-y-scroll felx flex-col h-full'>
                            <img src={user?.profileImage} className='m-5 w-24 rounded-full' style={{width:74+'px',height:74+'px'}}/>
                            <label className='font-bold text-lg p-5'>메시지</label>
                            <div className='m-5'>
                                {rooms?.map((r,index)=>
                                    <div key={index} className='flex cursor-pointer' onClick={()=>SetRoom(r)}>
                                        <img className='rounded-full' style={{width:44+'px',height:44+'px'}} src={r.roomType=='GROUP'?'/commons/group.png':(r.roomType=='SELF'?r.owner.profileImage:r.participants.filter((p:any)=>{if(p.username!= user.username) return p})[0].profileImage)} />
                                        <div className='flex flex-col'>
                                            <label className='ml-2 font-bold cursor-pointer' onClick={()=>SetRoom(r)}>{r.roomType=='GROUP'?r.name:(r.roomType=='SELF'?r.owner.nickname : r.participants.filter((p:any)=>{if(p.username!=user.username)return p})[0].nickname)}</label>
                                            <label className='ml-2 text-sm text-gray-400 cursor-pointer' onClick={()=>SetRoom(r)}>{Days({dateTime: r.roomType=='GROUP'? r.modifyDate : (r.roomType=='SELF'?Date():r.participants.filter((p:any)=>{if(p.username!=user.username)return p})[0].activeDate)})} 활동</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                :status==1?
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
                            <img src='/commons/activity.png' style={{width:64+'px',height:64+'px'}}></img>
                            <label className='p-2'>게시물 활동</label>
                            <label className='p-2'>다른 사람이 회원님의 게시물을 좋아하거나 댓글을 남기면 여기에 표시됩니다.</label>
                        </div>
                    </div>
                :
                    <></>
                }
                <Modal open={isMessageModalOpen} onClose={closeMessageModal} className='' outlineClose={true} escClose={true}>
                    <div className='flex flex-col' style={{width:550+'px',height:600+'px'}}>
                        <div className='flex justify-center items-center relative my-5'>
                            <label className='text-lg font-bold'>새로운 메시지</label>
                            <img src='/commons/x.png' className='fixed right-5 cursor-pointer' onClick={closeMessageModal} style={{width:18+'px',height:18+'px'}}/>
                        </div>
                        <div className='divider my-0'></div>
                        <div className='flex px-4'>
                            <label className='font-bold min-w-[77px] my-1'>받는 사람 : </label>
                            <div className='flex flex-wrap w-full'>
                            {selectedUsers&&selectedUsers.length>0 ?
                                selectedUsers?.map((u,index)=> <button className='btn btn-sm btn-info px-2 mx-1 text-white hover:text-black' key={index} onClick={()=>{const newUsers= selectedUsers.filter(check=>check!=u);setSelectedUsers(newUsers) }}>{u?.username}</button>)
                            :
                                <></>
                            }
                            <input id='search' type='text' className='ml-4 outline-none my-1' autoFocus placeholder='검색...' onChange={(e)=> Search(e.target)}/>
                            </div>
                        </div>
                        <div className='divider my-0'></div>
                        <div className='overflow-y-scroll' style={{width:548+'px',height:448+'px'}}>
                            {searchInterval?
                                <></>
                            :searchedUsers && searchedUsers.length!=0 ?
                                <>{searchedUsers.map((u,index)=>
                                    <div key={index} className='cursor-pointer hover:bg-base-300 flex my-2 px-5' onClick={()=>{const users = selectedUsers? selectedUsers: [] as any[]; if(!selectedUsers?.includes(u)) setSelectedUsers([...users,u]); (document.getElementById('search') as HTMLInputElement).value=''; clearInterval(searchInterval);setSearchInterval(null);setSearchedUsers(null as unknown as [])}}>
                                        <img src={u?.profileImage} className='rounded-full my-2' style={{width:44+'px',height:44+'px'}}/>
                                        <div className='flex flex-col justify-center mx-2'>
                                            <label className='text-sm'>{u?.nickname}</label>
                                            <label className='text-sm'>{u?.username}</label>
                                        </div>
                                    </div>
                                )}</>
                            :
                                <label className='mx-5 text-gray-500 text-sm'>계정을 찾을 수 없습니다.</label>
                            }
                        </div>
                        <button className='btn btn-info text-white m-4' disabled={!selectedUsers||selectedUsers.length==0} onClick={()=>CreateRoom()} > {isCreateingRomm?'생성중':'채팅'}</button>
                    </div>
                </Modal>
            </div> 
            {status!=0?<div className={'fixed right-0 h-screen z-[5]'} style={{width:(window.innerWidth-515+'px')}} onClick={()=>setStatus(0)}></div>:null}
        <div className='main w-full'>
        {
        !room?
            <div className='h-full w-full flex flex-col items-center justify-center'>
                <img src='/commons/my_message.png' style={{width:96+'px',height:96+'px'}}/>
                <label className='text-2xl p-3'>내 메시지</label>
                <label>친구나 그룹에 비공개 사진과 메시지를 보내보세요</label>
                <button className='btn btn-info text-white btn-sm m-5' onClick={()=>openMessage()}>메시지 보내기</button>
            </div>
        :
            <div className='flex flex-col relative' id='m_pbg'>
                <div className='ml-5 my-3 flex items-center'>
                    <img className='rounded-full' style={{width:44+'px',height:44+'px'}} src={room.roomType=='GROUP'?'/commons/group.png':(room.roomType=='SELF'?room.owner.profileImage:room.participants.filter((p:any)=>{if(p.username!= user.username) return p})[0].profileImage)} />
                    <label className='ml-2 font-bold'>{room.roomType=='GROUP'?room.name:(room.roomType=='SELF'?room.owner.nickname : room.participants.filter((p:any)=>{if(p.username!=user.username)return p})[0].nickname)}</label>
                </div>
                <div className='divider my-0'></div>
                <div id="chatSpace" className='flex flex-col overflow-y-scroll' style={{width:1400+'px',height:800+'px'}}>
                    {(room.chats as any[]).map((chat,index)=>
                        <div key={index} onClick={()=>console.log(chat)}>
                            {chat.sender.username == user.username?
                                <div className='flex justify-end mr-2'>
                                    <div className='flex flex-col'>
                                        <label className='rounded-l-full text-lg bg-blue-500 text-white px-5'>{chat.message}</label>
                                        <label className='text-gray-500 text-sm'>{GetDate({dateTime:chat.createDate})}</label>
                                    </div>
                                </div>
                            :
                                <div className='flex justify-start m-2'>
                                    <img className='rounded-full' src={chat.sender.profileImage} style={{width:44+'px',height:44+'px'}}/>
                                    <div className='flex flex-col m-2'>
                                        <label className='rounded-full text-lg bg-blue-500 text-white px-5'>{chat.message}</label>
                                        <label className='text-gray-500 text-sm'>{GetDate({dateTime:chat.createDate})}</label>
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                </div>
                <EmoteDropDown input_id='message_text' open={isEmoteDropDownOpen} setIsOpen={(v:boolean)=>setIsEmoteDropDownOpen(v)} onClick={()=>{}} background='m_pbg' button='m_eb'/>
                <div className='flex items-center rounded-full border border-black mx-4 px-4' style={{height:44+'px'}}>
                    <EmoteButton className='w-[24px] h-[24px]' id='m_eb' open={isEmoteDropDownOpen} setIsOpen={setIsEmoteDropDownOpen}/>
                    <textarea autoFocus id='message_text' className='outline-none ml-2 break-words w-full resize-none' rows={1} placeholder='메시지 입력...' />
                    <label className='min-w-[55px] h-[18px] text-blue-500 hover:text-black cursor-pointer' onClick={Send }>보내기</label>
                </div>
            </div>
        }
      </div>    
    </main>);
}