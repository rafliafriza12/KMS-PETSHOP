interface ColorConfig {
  background: string;
  foreground: string;
}
interface ShapeConfig {
  parent: string;
  child: string;
}

interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
    shapeV1: ShapeConfig;
    shapeV2: ShapeConfig;
  };
  dark: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
    shapeV1: ShapeConfig;
    shapeV2: ShapeConfig;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    card: {
      background: '#FFFFFF',
      foreground: '#1A1A1A',
    },
    popover: {
      background: '#FFFFFF',
      foreground: '#1A1A1A',
    },
    primary: {
      background: '#453BCF',
      foreground: '#FFFFFF',
    },
    secondary: {
      background: '#F8F9FA',
      foreground: '#374151',
    },
    muted: {
      background: '#F3F4F6',
      foreground: 'rgba(55, 65, 81, 0.7)',
    },
    accent: {
      background: '#E5E7EB',
      foreground: '#374151',
    },
    destructive: {
      background: '#EF4444',
      foreground: '#FFFFFF',
    },
    warning: {
      background: '#F59E0B',
      foreground: '#1F2937',
    },
    success: {
      background: '#10B981',
      foreground: '#FFFFFF',
    },
    info: {
      background: '#3B82F6',
      foreground: '#FFFFFF',
    },
    border: 'rgba(229, 231, 235, 0.8)',
    input: '#374151',
    ring: '#453BCF',
    shapeV1: {
      parent: '#453BCF',
      child: '#5B46E5',
    },
    shapeV2: {
      parent: '#F3F4F6',
      child: '#F9FAFB',
    },
  },
  dark: {
    background: '#0A0A0A',
    foreground: '#F9FAFB',
    card: {
      background: '#111827',
      foreground: '#F9FAFB',
    },
    popover: {
      background: '#1F2937',
      foreground: '#F9FAFB',
    },
    primary: {
      background: '#6366F1',
      foreground: '#F9FAFB',
    },
    secondary: {
      background: '#374151',
      foreground: '#D1D5DB',
    },
    muted: {
      background: '#374151',
      foreground: 'rgba(209, 213, 219, 0.7)',
    },
    accent: {
      background: '#4B5563',
      foreground: '#F3F4F6',
    },
    destructive: {
      background: '#DC2626',
      foreground: '#F9FAFB',
    },
    warning: {
      background: '#D97706',
      foreground: '#F9FAFB',
    },
    success: {
      background: '#059669',
      foreground: '#F9FAFB',
    },
    info: {
      background: '#2563EB',
      foreground: '#F9FAFB',
    },
    border: 'rgba(75, 85, 99, 0.3)',
    input: '#F9FAFB',
    ring: '#6366F1',
    shapeV1: {
      parent: '#4C1D95',
      child: '#5B21B6',
    },
    shapeV2: {
      parent: '#374151',
      child: '#4B5563',
    },
  },
};
