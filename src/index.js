import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Routes from './routes';
import {store,persistor} from "./store/store";
import "./index.css";
import {PersistGate} from "redux-persist/integration/react";



ReactDOM.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
    <Routes />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);


