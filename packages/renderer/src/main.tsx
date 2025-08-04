import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
     <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
    "colorPrimary": "#c3423d",
    "colorInfo": "#c3423d",
    "colorBgBase": "#0e0e10",
    "colorError": "#ff181c",
      "fontFamily": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      },
    }}
  >
    <App />
  </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
