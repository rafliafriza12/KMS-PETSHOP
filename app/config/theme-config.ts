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
    background: "#FFFFFF",
    foreground: "#000000",
    card: {
      background: "#FFFFFF",
      foreground: "#000000",
    },
    popover: {
      background: "#FFFFFF",
      foreground: "#000000",
    },
    primary: {
      background: "#000000",
      foreground: "#FFFFFF",
    },
    secondary: {
      background: "#F5F5F5",
      foreground: "#000000",
    },
    muted: {
      background: "#F5F5F5",
      foreground: "rgba(0, 0, 0, 0.6)",
    },
    accent: {
      background: "#EAEAEA",
      foreground: "#000000",
    },
    destructive: {
      background: "#FF0000",
      foreground: "#FFFFFF",
    },
    warning: {
      background: "#FFD700",
      foreground: "#000000",
    },
    success: {
      background: "#00C853",
      foreground: "#FFFFFF",
    },
    info: {
      background: "#2196F3",
      foreground: "#FFFFFF",
    },
    border: "rgba(0, 0, 0, 0.1)",
    input: "#000000",
    ring: "#000000",
    shapeV1: {
      parent: "#CCCCCC",
      child: "#F5F5F5",
    },
    shapeV2: {
      parent: "#EAEAEA",
      child: "#FFFFFF",
    },
  },
  dark: {
    background: "#000000",
    foreground: "#FFFFFF",
    card: {
      background: "#1A1A1A",
      foreground: "#FFFFFF",
    },
    popover: {
      background: "#1A1A1A",
      foreground: "#FFFFFF",
    },
    primary: {
      background: "#FFFFFF",
      foreground: "#000000",
    },
    secondary: {
      background: "#2A2A2A",
      foreground: "#FFFFFF",
    },
    muted: {
      background: "#2A2A2A",
      foreground: "rgba(255, 255, 255, 0.6)",
    },
    accent: {
      background: "#333333",
      foreground: "#FFFFFF",
    },
    destructive: {
      background: "#FF0000",
      foreground: "#FFFFFF",
    },
    warning: {
      background: "#FFD700",
      foreground: "#000000",
    },
    success: {
      background: "#00C853",
      foreground: "#FFFFFF",
    },
    info: {
      background: "#2196F3",
      foreground: "#FFFFFF",
    },
    border: "rgba(255, 255, 255, 0.1)",
    input: "#FFFFFF",
    ring: "#FFFFFF",
    shapeV1: {
      parent: "#333333",
      child: "#1A1A1A",
    },
    shapeV2: {
      parent: "#4D4D4D",
      child: "#2A2A2A",
    },
  },
};
