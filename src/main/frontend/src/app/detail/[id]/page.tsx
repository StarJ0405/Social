import Image from "next/image";
import axios from 'axios';

async function getDate() {
  return 1;
}
export default async function Home({params}:{params:any}) {
  console.log(params.id);


  return (
      <div className="w-[150px] h-[150px]"></div>
  );
}
