import { ToolTipProps } from "@/app/types/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Text } from "@/app/components/ui/Text";

export default function UseTooltip({
  children,
  content,
  ...props
}: ToolTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <Text>{content}</Text>
      </TooltipContent>
    </Tooltip>
  );
}
