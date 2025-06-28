'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { SocketProvider } from '@/context/SocketContext';

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SocketProvider>
          {children}
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}
