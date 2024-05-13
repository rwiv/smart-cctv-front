import {ReactNode} from "react";

interface BasicProps {
  children: ReactNode;
  className?: string;
}

interface StackProps extends BasicProps {
  gap?: number;
}

function Flex({ children, className }: BasicProps) {
  return (
    <div className={className} css={{ display: "flex" }}>
      {children}
    </div>
  )
}

function VStack({ children, className, gap = 8 }: StackProps) {
  return (
    <div className={className} css={{
      display: "flex",
      flexDirection: "column",
      gap,
    }}>
      {children}
    </div>
  )
}

function HStack({ children, className, gap = 8 }: StackProps) {
  return (
    <div className={className} css={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap,
    }}>
      {children}
    </div>
  )
}

function Center({ children, className }: BasicProps) {
  return (
    <div className={className} css={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {children}
    </div>
  )
}

export { Flex, VStack, HStack, Center };