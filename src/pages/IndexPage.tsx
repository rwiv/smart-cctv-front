import {BG_BASE} from "@/styles/colors.ts";
import {LeftSidebar} from "@/components/layouts/LeftSidebar.tsx";
import {VideoPlayerContent} from "@/components/video/VideoPlayerContent.tsx";

export function IndexPage() {

  return (
    <div css={{ display: "flex", height: "100vh", background: BG_BASE }}>
      <div className="flex" css={{width: "19rem"}}>
        <LeftSidebar css={{margin: "0rem 1rem"}} />
      </div>
      <div className="flex w-full m-3 overflow-auto">
        <VideoPlayerContent name={"live"} isLive={true} />
      </div>
    </div>
  )
}
