import { InstagramEmbed } from "react-social-media-embed";
export default function CardPosts({ post }) {
  return (
    <div className="flex justify-center overflow-hidden h-[330px] border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl">
      <div className="-mt-16 mb-0 py-0">
        <InstagramEmbed url={post} width={350} height={400} />
      </div>
    </div>
  );
}
