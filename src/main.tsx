import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

const root = document.getElementById('root') as HTMLElement;
const reactRoot = createRoot(root);

reactRoot.render(<>
    <App />
</>);
