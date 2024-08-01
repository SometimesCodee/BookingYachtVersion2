import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import reportWebVitals from './reportWebVitals';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/Store'
import Layout from './Layout';
import { PersistGate } from 'redux-persist/integration/react'
import TriggerFormSearch from './components/home/TriggerFormSearch';
import './utils/I18n'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TriggerFormSearch>
        <BrowserRouter>
          {/* <React.StrictMode> */}
          <Layout />
          {/* </React.StrictMode> */}
        </BrowserRouter>
      </TriggerFormSearch>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
