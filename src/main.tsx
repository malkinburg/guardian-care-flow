
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure we're using the React 18 createRoot API correctly
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
