import { createStore } from 'redux';
import { Reducer, initialState } from './Reducer';
export const configure = () => {
    const store = createStore(
        Reducer, initialState
    );
    return store;
}