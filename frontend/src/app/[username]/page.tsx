import { fetchArticleList, fetchnonUser } from "../API/NonUserAPI";
import Main from "../Global/main";
import CSR_PAGE from "./CSR";


export default async function Home({ params }: { params: any }) {
    const owner = await fetchnonUser(params.username);
return <Main>
        <div className="w-full h-full flex flex-col items-center justify-start">
            <div className='w-[60%]'>
                {!owner ?
                    <div className="flex flex-col text-center">
                        <label className="text-2xl font-bold m-5 mt-[100px]">죄송합니다. 페이지를 사용할 수 없습니다.</label>
                        <label className="m-5">클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다. <a href="/" className="text-blue-500">Social으로 돌아가기</a></label>
                    </div>
                    :
                    <CSR_PAGE serverOwner={owner} ServerArticleList={await fetchArticleList({ username: owner.username, page: 0 })} />
                }
            </div>
        </div>
    </Main>;
}


