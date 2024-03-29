import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
import { Provider } from 'react-redux';
// ----------------------------------------------------------------------


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
  </Provider>
);

// If you want to enable client cache, register instead.

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
