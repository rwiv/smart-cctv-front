import {HOVER, SEPARATOR, TEXT2} from "@/styles/colors.ts";
import {css} from "@emotion/react";
import {ReactNode} from "react";

interface LeftSidebarProps {
  className?: string;
}

export function LeftSidebar({ className }: LeftSidebarProps) {
  return (
    <div className={"flex flex-col overflow-auto w-full " + className}>
      <SidebarButton>기기 목록</SidebarButton>
      <SidebarButton>시청 기록</SidebarButton>
      <Separator />
    </div>
  )
}

function SidebarButton({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-sm px-1 py-2" css={css`
      color: ${TEXT2};
      font-weight: 500;
      font-size: 1.2rem;
      cursor: pointer;
      &:hover {
        background: ${HOVER};
      }
    `}>
      {children}
    </div>
  )
}

function Separator({ height = 0.12, className }: { height?: number, className?: string }) {
  return (
    <div
      className={"w-full " + className}
      css={{ height: `${height}rem`, background: SEPARATOR }}
    />
  )
}