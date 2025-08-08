import ToggleTheme from "./ui/toggle";

export default function HeaderApp() {
  return (
    <nav className="flex justify-between items-center w-full p-2">
      <ToggleTheme />
    </nav>
  );
}
