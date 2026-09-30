import { createRoot } from 'react-dom/client';
import { loadSatoshi } from './lib/fonts';
import Root from './pages/Root';

loadSatoshi();
createRoot(document.getElementById('app')!).render(<Root />);
