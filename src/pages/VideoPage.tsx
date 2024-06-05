import {BG_BASE} from "@/styles/colors.ts";
import {LeftSidebar} from "@/components/layouts/LeftSidebar.tsx";
import {VideoPlayerContent} from "@/components/video/VideoPlayerContent.tsx";
import {useParams} from "react-router";

export function VideoPage() {

  const params = useParams();
  const name = params["name"];

  console.log(params["name"]);

  return (
    <div css={{ display: "flex", height: "100vh", background: BG_BASE }}>
      <div className="flex" css={{width: "19rem"}}>
        <LeftSidebar css={{margin: "0rem 1rem"}} />
      </div>
      {name && (
        <div className="flex w-full m-3 overflow-auto">
          <VideoPlayerContent name={name} isLive={false} />
        </div>
      )}
    </div>
  )
}
