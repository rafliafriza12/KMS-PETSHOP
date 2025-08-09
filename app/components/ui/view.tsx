import { ContainerProps } from '@/app/types/ui';
export default function View({ children, className, as: Tag = 'view', ...props }: ContainerProps) {
  return <div className={className}>{children}</div>;
}
