
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

//замінив стандартний код, щоб забрати 'Strict mode', бо він призводив до повторного рендеру і не давав працювати localStorage
//якщо це важливо для ТЗ - можна повернути 'Strict mode', але тоді я не впевнений як відремонтувати localStorage
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // або './index.scss' якщо використовуєте SCSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

