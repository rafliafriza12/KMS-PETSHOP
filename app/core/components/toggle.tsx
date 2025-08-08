import { useTheme } from "@/app/hooks/theme/use-theme";
import { Button } from "@/app/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
const ToggleTheme: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="size-9 rounded-md"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Icon icon="iconamoon:mode-dark" className="absolute size-5" />
      ) : (
        <Icon icon="iconamoon:mode-light" className="size-5" />
      )}
    </Button>
  );
};

export default ToggleTheme;
