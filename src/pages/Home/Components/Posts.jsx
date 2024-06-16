import {Instagrams} from "./../../../data/Instagrams";
import CardPosts from './CardPost';
import ProfileCard from "./ProfileCard";
export default function Posts() {

  return (
    <>
      <div className='flex flex-col w-full place-content-center place-items-center'>
        <div className='flex flex-row !place-content-start !justify-start !place-items-start flex-wrap min-w-[360px]'>
          <ProfileCard profileinfo={Instagrams.profile}/>
        </div>
        <div className='flex justify-center items-center flex-wrap min-w-[360px] gap-5 mb-20'>
          {
            Instagrams.publications.map((post,index)=>(
              <CardPosts  key={index} post={post}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
