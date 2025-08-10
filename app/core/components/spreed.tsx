interface SpreedProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Spreed({ orientation = 'horizontal', className = '' }: SpreedProps) {
  return (
    <div
      className={`
        bg-[var(--border-color,#e5e7eb)] 
        ${orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px'} 
        ${className}
      `}
    ></div>
  );
}
