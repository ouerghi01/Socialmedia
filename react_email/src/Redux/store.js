import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import ShareReducer from './ShareUsersSlice';
import { enableMapSet } from 'immer';
enableMapSet();

export const store = configureStore({
    reducer: {
        user: userReducer,
        shareUsers: ShareReducer,
    },
});
