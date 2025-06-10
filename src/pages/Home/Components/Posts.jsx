import { Instagrams } from './../../../data/Instagrams';
import CardPosts from './CardPost';
import ProfileCard from './ProfileCard';
import { useState, useEffect } from 'react';

const ACCESS_TOKEN =
  'IGQWRNaXpCNE1MSVBnZA0pLNFVMSU9LQktEMlJEN3ZALVEE4R0ZAlWEVNcjV6b1dJLTE4MnZA5WnAxRGZAIcmM3NnhsejFuWDRpWHJUN2ljWHJBNUJJNnRpNGFRbjJmU2dqT19OQ2JkRGc0OEVMQQZDZD';

const getPosts = async () => {
  const URL = `https://graph.instagram.com/me/media?fields=permalink&access_token=${ACCESS_TOKEN}`;
  const reqOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(URL, reqOptions);
  const data = await response.json();

  return data.data;
};

export default function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data.slice(0, 8));
    });
  }, []);

  return (
    <>
      <div className="flex w-full flex-col place-content-center place-items-center">
        <div className="mb-10 flex min-w-[360px] flex-row flex-wrap !place-content-start !place-items-start !justify-start">
          <ProfileCard profileinfo={Instagrams.profile} />
        </div>
        <div className="mb-20 flex min-w-[360px] flex-wrap items-center justify-center gap-5">
          {posts &&
            posts.map(({ permalink }, index) => (
              <CardPosts key={index} post={permalink} />
            ))}
        </div>
      </div>
    </>
  );
}
