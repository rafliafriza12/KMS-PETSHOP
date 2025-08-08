import Container from "./container";
import FilterHome from "@/app/core/components/filter";
import { Input } from "./input";
import { SearchingProps } from "@/app/types/ui";
import { usePathname } from "next/navigation";

const Searching = ({ value, onChange, ...props }: SearchingProps) => {
  const pathName = usePathname();
  const hiddenFilter = ["/user/kategori"];
  return (
    <Container className="flex items-center gap-2 w-full px-4 mt-2">
      <Input placeholder="Pencarian" onChange={onChange} value={value} />
      {!hiddenFilter.includes(pathName) && <FilterHome />}
    </Container>
  );
};

export default Searching;
