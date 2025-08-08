// ThemeProvider.tsx
import React, { Component, createContext, useContext, useState } from 'react';
import { ConfigProvider, Dropdown, Layout, theme as antdTheme } from 'antd';
import { Link } from 'react-router-dom';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // Default to dark

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getThemeConfig = () => {
    const baseConfig = {
      token: {
        fontFamily: 'Urbanist, sans-serif',
      },
    };



const themeMode = localStorage.getItem('themeMode') as ThemeMode || 'dark';

if (themeMode === 'dark') {
  return {
    ...baseConfig,
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: "#c4423d",
      colorInfo: "#c4423d",
      colorBgBase: "#191a1b",
      colorBgContainer: "#21252cff",
      fontFamily: "'poppins', sans-serif",
    },
    components: {
      Menu: {
        itemBg: 'transparent',
        itemColor: 'rgba(255, 255, 255, 0.65)',
        itemHoverColor: '#ffffff',
        itemSelectedColor: '#ffffff',
        itemHoverBg: '#c4413d83',
        itemSelectedBg: '#c4423d',
      },
      Dropdown: {
        colorBgContainer: 'rgba(33, 37, 44, 1)',
        colorText: '#ffffff',
        colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
        colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
      },
      Typography: {
        colorText: '#ffffff',
        colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
        colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
        colorLink: 'ffffff',
      },
      Layout: {
        siderBg: "rgba(33, 37, 44, 1)",
        siderBorderColor: "rgba(255, 255, 255, 0.1)",
        headerBg: "rgba(33, 37, 44, 1)",
        contentBg: "rgba(33, 37, 44, 1)",
      }
    }
  };
} else {
  return {
    ...baseConfig,
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      ...baseConfig.token,
      colorPrimary: "#c3423d",
      colorInfo: "#c3423d",
      colorError: "#ff181c",
      colorText: "#000000",
      colorBgContainer: "#ffffff",
    },
  };
}
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider theme={getThemeConfig()}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
