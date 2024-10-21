
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store'; 
import App from './App';
import { ViewProvider } from './context/ViewContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
});
root.render(
  <ViewProvider>
  <Provider store={store}>  {}
    <App />
  </Provider>
  </ViewProvider>
);

