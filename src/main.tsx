import React from 'react';
import ReactDOM from 'react-dom/client';

import showVersion from './utils/version';
import RootProvider from './features/Providers';
import Router from './routes';

import '@mantine/core/styles.layer.css';
import '@/styles/global.css';
import '@/utils/dayjs';
import '@fontsource/poppins/latin.css';
import '@fontsource/poppins/latin-italic.css';
import '@fontsource/ubuntu/latin.css';

const element = document.getElementById('root')!;

showVersion();

ReactDOM.createRoot(element).render(
    <React.StrictMode>
        <RootProvider>
            <Router />
        </RootProvider>
    </React.StrictMode>,
);
