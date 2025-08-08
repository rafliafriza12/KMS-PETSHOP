import { ShapeProps } from "@/app/types/ui";
export default function Shape({
  className,
  as: Tag = "div",
  ...props
}: ShapeProps) {
  return <div className={`${className}`}></div>;
}
