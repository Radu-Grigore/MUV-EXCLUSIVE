// Entry for the static build (npm run build:static → dist/). Same page as the Laravel app,
// rendered without Inertia, with self-hosted fonts instead of Laravel's @fonts.
import '@fontsource-variable/dm-sans/index.css';
import '@fontsource/instrument-serif/latin.css';
import '@fontsource/instrument-serif/latin-ext.css';
import '@fontsource/instrument-serif/latin-italic.css';
import '@fontsource/instrument-serif/latin-ext-italic.css';
import '@fontsource/allura/index.css';
import '../css/app.css';
import '../css/static-fonts.css';
import { createRoot } from 'react-dom/client';
import { loadSatoshi } from './lib/fonts';
import Root from './pages/Root';

loadSatoshi();

createRoot(document.getElementById('app')!).render(<Root />);
