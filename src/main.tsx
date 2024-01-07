import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/utils/dayjs';

import RootProvider from './features/Providers';
import Router from './routes';
import showVersion from './utils/version';

import '@/assets/styles/global.css';
import '@fontsource/ubuntu/latin.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';

const element = document.getElementById('root')!;

showVersion();

ReactDOM.createRoot(element).render(
    <React.StrictMode>
        <RootProvider>
            <Router />
        </RootProvider>
    </React.StrictMode>,
);
