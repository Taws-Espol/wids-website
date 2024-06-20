import { useState } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

function Image({ src }) {
    return (
        <img src={src} alt="post" className="w-full h-full" />
    )
}

function Video({ src }) {
    return (
        <video src={src} controls className="object-cover w-full h-full" />
    )
}

function Carousel({ slides }) {
    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div className="overflow-hidden w-full">
            <div
                className={`flex transition ease-out duration-40`}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((s, i) => {
                    return <img src={s} className="" key={i} />;
                })}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill color="grey" />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill color="grey" />
                </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(i);
                            }}
                            key={"circle" + i}
                            className={`rounded-full w-5 h-5 cursor-pointer  ${i == current ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}

export default function CardPosts({ data }) {
    let element = null;

    switch (data.type) {
        case 'IMAGE':
            element = <Image src={data.media_url} />;
            break;
        case 'VIDEO':
            element = <Video src={data.media_url} />;
            break;
        case 'CAROUSEL_ALBUM':
            element = <Carousel slides={data.album} />;
            break;
        default:
            element = null;
    }


    return (
        <div className="flex justify-center overflow-hidden h-[330px] border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl">
            <div className="max-w-96 max-h-96">
                {element}
            </div>
        </div>
    )
}