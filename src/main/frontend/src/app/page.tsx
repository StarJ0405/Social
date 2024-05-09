import Image from "next/image";
import axios from 'axios';
import Sidebar from './sidebar';
import Login from './login';
export default function Home() {
  if(true)
        return (<main className="flex"><Login /></main>);
  else
        return (
            <main className="flex">
                <Sidebar/>
                <div className="main w-full overflow-y-auto">
                    <div className="content w-full min-h-[85%]"></div>
                    <div className="footer w-full h-[15%]">
                    </div>
                </div>
            </main>
      );
}
