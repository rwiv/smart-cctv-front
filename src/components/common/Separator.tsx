import {SEPARATOR} from "@/styles/colors.ts";

export function Separator({ height = 0.12, className }: { height?: number, className?: string }) {
  return (
    <div
      className={"w-full " + className}
      css={{ height: `${height}rem`, background: SEPARATOR }}
    />
  )
}
