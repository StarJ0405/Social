import Image from "next/image";
import Main from '@/app/global/main';
import {getAPI} from '@/app/API/axiosAPI';
import {Avatar} from "./CSR"

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
const axios = getAPI();

async function Profile({username} : {username:string}) {
    axios.defaults.headers.common['Username'] = username;
    const response = await axios.get('/api/user/data');
    const user = response.data;
    if(user==null || user == "")
        return (
            <div className="flex flex-col text-center">
                <label className="text-2xl font-bold m-5 mt-[100px]">죄송합니다. 페이지를 사용할 수 없습니다.</label>
                <label className="m-5">클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다. <a href="/" className="text-blue-500">Social으로 돌아가기</a></label>
            </div>
        );
    else
        return (
            <div className="flex justify-center w-[80%] mt-5">
                <div className="avatar w-[250px] h-[200px] flex justify-center cursor-pointer">
                    <div className="w-200 rounded-full">
                        <Avatar user={user} />
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
                        <label>{user.description}</label>
                    </div>
                </div>
            </div>
        );
}