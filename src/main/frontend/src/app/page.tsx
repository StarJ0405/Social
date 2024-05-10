import Image from "next/image";
import axios from 'axios';
import Sidebar from '@/app/sidebar';
import { redirect } from 'next/navigation';
export default function Home() {
  if(true)
        return redirect("/account/login");
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
