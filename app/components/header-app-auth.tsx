import ArrowBack from '../core/components/arrow-back';
import ToggleTheme from './ui/toggle';

export default function HeaderAppAuth() {
  return (
    <nav className="flex justify-between items-center w-full p-2">
      <ArrowBack />
      <ToggleTheme />
    </nav>
  );
}
