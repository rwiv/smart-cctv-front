import {HOVER, TEXT1, TEXT2} from "@/styles/colors.ts";
import {css} from "@emotion/react";
import {Separator} from "@/components/common/Separator.tsx";
import {ReactNode} from "react";
import {MyInfo} from "@/components/layouts/MyInfo.tsx";
import {Link} from "react-router-dom";

interface LeftSidebarProps {
  className?: string;
}

export function LeftSidebar({ className }: LeftSidebarProps) {

  return (
    <div className={"flex flex-col overflow-auto w-full " + className}>
      <div className="rounded-sm px-1 py-2" css={css`
        color: ${TEXT1};
        font-weight: 500;
        font-size: 1.3rem;
        margin-bottom: 1rem;
      `}>
        Smart CCTV
      </div>
      <Link to={"/"}>
        <SidebarButton>라이브</SidebarButton>
      </Link>
      <Link to={"/video"}>
        <SidebarButton>녹화본</SidebarButton>
      </Link>
      <Link to={"/signup"}>
        <SidebarButton>계정 추가</SidebarButton>
      </Link>
      <Separator className="my-1"/>

      <div className="fixed bottom-0 mb-4">
        <MyInfo/>
      </div>
    </div>
  )
}

export function SidebarButton({children}: { children: ReactNode }) {
  return (
    <div className="rounded-sm px-1 py-2" css={css`
      margin: 0.2rem;
      color: ${TEXT2};
      font-weight: 500;
      font-size: 1.1rem;
      cursor: pointer;
      &:hover {
        background: ${HOVER};
      }
    `}>
      {children}
    </div>
  )
}
