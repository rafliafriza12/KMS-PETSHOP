import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import UseTooltip from "@/app/hooks/tooltip/tooltip/tooltip";
const FilterHome: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <UseTooltip content="Filter">
          <SlidersHorizontal />
        </UseTooltip>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FilterHome;
