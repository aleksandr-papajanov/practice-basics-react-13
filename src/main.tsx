import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './components/App.tsx'
import { player as data } from './data.tsx';
import { DataProvider } from './DataProvider.tsx';

const dataProvider = new DataProvider(data);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App dataProvider={dataProvider} />
  </StrictMode>,
)
