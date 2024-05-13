import Image from "next/image";
import axios from 'axios';
import Main from '@/app/global/main';
export default function Home({params}:{params:any}) {

  const body =
  (<div className="flex justify-center">
        <Profile username={params.username}/>
        <div>
        </div>
  </div>);
  return (
       <Main body={body}/>
  );
}

function Profile({username} : {username:string}) {
    const user = axios.get('/api/user/data?username='+username);
//     console.log(user);
    return (
        <div className="flex justify-center w-[80%] mt-5">
            <div className="avatar w-[250px] h-[200px] flex justify-center">
                <div className="w-200 rounded-full">
                    <img src={user.profileImage!=null?user.profileImage:'/basic_profile.png'} alt="profile" />
                </div>
            </div>
            <div className="flex flex-col w-[30%]">
                <div className="mb-5">
                    <label className="mr-5">{user.username}</label>
                    <button className="btn">프로필 편집</button>
                </div>
                <div className="mb-5">
                    <label className="mr-5">게시물</label>
                    <label className="mr-5">팔로워</label>
                    <label className="mr-5">팔로우</label>
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold">{user.nickname}</label>
                    <label>안녕하세요~</label>
                </div>
            </div>
        </div>
    );
}