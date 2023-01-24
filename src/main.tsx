import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'rc-tooltip/assets/bootstrap.css';
import 'toastr/build/toastr.css';

import {routes} from '@/routes';
import App from '@/components/App';
import {store} from '@/store';
import initIpcListeners from '@/electron/listeners';

initIpcListeners();

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <React.StrictMode>
        <App routes={routes} />
      </React.StrictMode>
    </HashRouter>
  </Provider>
);

postMessage({payload: 'removeLoading'}, '*');
