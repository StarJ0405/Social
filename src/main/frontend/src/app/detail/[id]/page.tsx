import Image from "next/image";
import axios from 'axios';

const fetchHello = async () => {
  const response = await axios.get('/api/hello');
  const hello = response.data;
  return hello;
};
export default function Home({params}:{params:any}) {

  console.log(params.id);
  console.log("   blank   ");
  return (
      <div className="bg-black w-[150px] h-[150px]">{fetchHello()}</div>

  );
}
