import { useEffect } from "react";
import Subtitle from "./Subtitle";
import "./post.css";

export default function Posts() {

  useEffect(() => {
    window.addEventListener("load", () => {
      const script = document.createElement("script", { id: "instafeed" });
      script.setAttribute("src", "src/shared/startInstafeed.js");
      document.body.appendChild(script);
    });
  }, []);

  return (
    <div className="flex flex-col justify-items-center items-center">
      <Subtitle text="Mira nuestros últimos posts en Instagram!" />
      <div id="instafeed" className="px-8 py-4 flex flex-col md:flex-row">
      </div>
    </div>
  )
}
