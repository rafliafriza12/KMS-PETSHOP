import { useState } from 'react';
import { Filter, Scissors, Heart, Home, GraduationCap, Apple } from 'lucide-react';
import View from './ui/view';
import { Label } from '@radix-ui/react-label';

interface FilterLayananProps {
  onChange: (id: string) => void;
  count: any[];
}

const FilterLayanan: React.FC<FilterLayananProps> = ({ onChange, count }) => {
  const [active, setActive] = useState('all');

  const countByKategori = (kategori: string) => {
    if (kategori === 'all') return count?.length || 0;
    return count?.filter(
      (item: any) => item.layanan.kategori.toLowerCase() === kategori.toLowerCase()
    ).length;
  };

  const filterData = [
    { id: 'all', label: 'Semua Layanan', icon: <Filter size={16} /> },
    { id: 'grooming', label: 'Grooming', icon: <Scissors size={16} /> },
    { id: 'kesehatan', label: 'Kesehatan', icon: <Heart size={16} /> },
    { id: 'penitipan', label: 'Penitipan', icon: <Home size={16} /> },
    { id: 'pelatihan', label: 'Pelatihan', icon: <GraduationCap size={16} /> },
    { id: 'nutrisi', label: 'Nutrisi', icon: <Apple size={16} /> },
  ];

  const handleClick = (id: string) => {
    setActive(id);
    onChange(id);
  };

  return (
    <View className="space-y-4 w-full p-4 card-glass rounded-xl shadow-enhanced">
      <Label className="font-bold text-xl text-gradient-primary">Filter Layanan :</Label>
      <View className="flex flex-wrap gap-3 mt-2 ">
        {filterData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover-lift hover:scale-105 shadow-enhanced backdrop-blur-enhanced
            ${
              active === item.id
                ? 'gradient-primary/20 text-[var(--shapeV1-parent)]'
                : 'bg-[var(--shapeV2-parent)]/50 text-foreground hover:bg-[var(--shapeV1-parent)]/80'
            }`}
          >
            <View className="">{item.icon}</View>
            <Label className="font-semibold">{item.label}</Label>
            <Label
              className={`px-3 py-1 text-xs rounded-full card-glass animate-glow
              ${
                active === item.id
                  ? 'bg-[var(--shapeV1-parent)]/80 text-foreground'
                  : 'text-foreground'
              }`}
            >
              {countByKategori(item.id)}
            </Label>
          </button>
        ))}
      </View>
    </View>
  );
};

export default FilterLayanan;
