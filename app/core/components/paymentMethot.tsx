import View from '@/app/components/ui/view';
import { Text } from '@/app/components/ui/Text';
import { cn } from '@/app/lib/utils';

interface PaymentMethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  adminFee?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function PaymentMethodCard({
  icon,
  title,
  description,
  adminFee,
  onClick,
  selected,
}: PaymentMethodCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col p-3 border rounded-lg cursor-pointer transition-colors',
        selected ? 'border-primary bg-primary/5' : 'border-border'
      )}
    >
      <View className="flex flex-row items-center gap-2">
        {icon}
        <Text className="font-semibold">{title}</Text>
      </View>
      <Text className="text-xs text-muted-foreground">{description}</Text>
      {adminFee && (
        <Text className="text-xs text-red-500 font-medium mt-1">Biaya admin: {adminFee}</Text>
      )}
    </div>
  );
}
