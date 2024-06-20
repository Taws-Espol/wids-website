import {Instagrams} from "./../../../data/Instagrams";
import CardPosts from './CardPost';
import ProfileCard from "./ProfileCard";
import { useState, useEffect } from "react";

const ACCESS_TOKEN = 'IGQWRNaXpCNE1MSVBnZA0pLNFVMSU9LQktEMlJEN3ZALVEE4R0ZAlWEVNcjV6b1dJLTE4MnZA5WnAxRGZAIcmM3NnhsejFuWDRpWHJUN2ljWHJBNUJJNnRpNGFRbjJmU2dqT19OQ2JkRGc0OEVMQQZDZD';

const fields = 'id,media_url,media_type,permalink';

const reqOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
}

const getMediaById = async (media_id) => {
  const URL = `https://graph.instagram.com/${media_id}?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(URL, reqOptions);
  const data = await response.json();

  return data;
}

const getPosts = async () => {
  const URL = `https://graph.instagram.com/me/media?fields=${fields},children&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(URL, reqOptions);
  const json = await response.json();
  const data = json.data;

  const finalData = await Promise.all(data.map(async (post) => {
    const type = post.media_type;
    if (type === 'CAROUSEL_ALBUM') {
      const children = post.children.data;
      const album = await Promise.all(children.map(async (childId) => {
        const id = childId.id;
        const media = await getMediaById(id);
        return media.media_url;
      })
      );
      return {
        type,
        album
      }
    } 
    return {
      media_url: post.media_url,
      type: post.media_type,
    };
  }));

  return finalData;
}

export default function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data.slice(0, 8));
    });
  }, []);

  return (
    <>
      <div className='flex flex-col w-full place-content-center place-items-center'>
        <div className='flex flex-row !place-content-start !justify-start !place-items-start flex-wrap min-w-[360px]'>
          <ProfileCard profileinfo={Instagrams.profile}/>
        </div>
        <div className='flex justify-center items-center flex-wrap min-w-[360px] gap-5 mb-20'>
          {
            posts && posts.map((data, index)=>(
              <CardPosts key={index} data={data}/>
            )) 
          }
        </div>
      </div>
    </>
  )
}