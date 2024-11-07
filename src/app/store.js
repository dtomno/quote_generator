import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import quotesReducer from "../features/quotes/quotesSlice";
import { setQuotes } from "../features/quotes/quotesSlice";

export const listenerMiddleWare = createListenerMiddleware();
listenerMiddleWare.startListening({
    actionCreator: setQuotes,
    effect: (action,listenerApi) => {
        try {
            localStorage.setItem('appState', JSON.stringify(listenerApi.getState()));
        } catch (error) {
            console.log(error);
        }
        return;
    }
});

const appInitialState = JSON.parse(localStorage.getItem('appState')) || null;

export default configureStore({
    preloadedState: {quotes: appInitialState?.quotes ? appInitialState?.quotes : []},
    reducer: {
        quotes: quotesReducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(listenerMiddleWare.middleware) 
});