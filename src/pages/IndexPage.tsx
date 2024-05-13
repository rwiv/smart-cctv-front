import {BG_BASE} from "@/styles/colors.ts";
import {LeftSidebar} from "@/components/layouts/LeftSidebar.tsx";
import {DeviceContent} from "@/components/device/DeviceContent.tsx";

export function IndexPage() {

  return (
    <div css={{ display: "flex", height: "100vh", background: BG_BASE }}>
      <div className="flex" css={{width: "19rem"}}>
        <LeftSidebar css={{margin: "0rem 1rem"}} />
      </div>
      <div className="flex w-full m-3">
        <DeviceContent />
      </div>
    </div>
  )
}
