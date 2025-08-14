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
    <View className="space-y-2 w-full">
      <Label className="font-semibold text-lg">Filter Layanan :</Label>
      <View className="flex flex-wrap gap-2 mt-2">
        {filterData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`flex items-center gap-2 px-6 py-4 rounded-lg transition 
              ${
                active === item.id
                  ? 'bg-[var(--shapeV1-child)] text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {item.icon}
            <Label>{item.label}</Label>
            <Label
              className={`px-2 py-0.5 text-xs rounded-full 
                ${active === item.id ? 'bg-[var(--shapeV1-parent)]' : 'text-gray-800'}`}
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
