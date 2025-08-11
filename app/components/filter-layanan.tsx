import { useState } from 'react';
import { Filter, Scissors, Heart, Home, GraduationCap, Apple } from 'lucide-react';
import View from './ui/view';
import { Text } from './ui/Text';
import { Label } from './ui/label';

const filterData = [
  { id: 'all', label: 'Semua Layanan', count: 8, icon: <Filter size={16} /> },
  { id: 'grooming', label: 'Grooming', count: 2, icon: <Scissors size={16} /> },
  { id: 'kesehatan', label: 'Kesehatan', count: 2, icon: <Heart size={16} /> },
  { id: 'penitipan', label: 'Penitipan', count: 1, icon: <Home size={16} /> },
  { id: 'pelatihan', label: 'Pelatihan', count: 1, icon: <GraduationCap size={16} /> },
  { id: 'nutrisi', label: 'Nutrisi', count: 2, icon: <Apple size={16} /> },
];

export default function FilterLayanan() {
  const [active, setActive] = useState('all');

  return (
    <View className="space-y-2 w-full">
      <Label className="font-semibold text-lg">Filter Layanan :</Label>
      <View className="flex flex-wrap gap-2 mt-2  ">
        {filterData.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
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
                ${active === item.id ? 'bg-[var(--shapeV1-parent)]' : ' text-gray-800'}`}
            >
              {item.count}
            </Label>
          </button>
        ))}
      </View>
    </View>
  );
}
