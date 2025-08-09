'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
const ArrowBack = () => {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };
  return (
    <Button variant="ghost" className="size-9 rounded-md" onClick={() => handleBack()}>
      <ArrowLeft />
    </Button>
  );
};

export default ArrowBack;
