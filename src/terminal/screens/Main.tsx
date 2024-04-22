import React from 'react';

//
// Main stack navigator
//
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function Main() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    );
}
