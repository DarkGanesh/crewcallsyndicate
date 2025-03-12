
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  // Créer un élément racine s'il n'existe pas déjà
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
}

createRoot(document.getElementById("root")!).render(<App />);
