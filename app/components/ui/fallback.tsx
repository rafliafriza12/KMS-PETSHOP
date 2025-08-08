import { FallbackProps } from "@/app/types/ui";
import Container from "./container";
import { Text } from "./Text";
import { Loader2Icon } from "lucide-react";
export default function Fallback({
  title,
  className,
  ...props
}: FallbackProps) {
  return (
    <Container className="flex justify-center items-center gap-1">
      <Loader2Icon className="animate-spin" />
      <Text className={`${className}`}>{title}</Text>
    </Container>
  );
}
