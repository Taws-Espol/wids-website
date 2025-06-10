import { InstagramEmbed } from 'react-social-media-embed';
export default function CardPosts({ post }) {
  return (
    <div className="flex h-[330px] justify-center overflow-hidden border-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-2xl">
      <div className="-mt-16 mb-0 py-0">
        <InstagramEmbed url={post} width={350} height={400} />
      </div>
    </div>
  );
}
