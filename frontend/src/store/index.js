import {configureStore} from '@reduxjs/toolkit'

import auth from './authSlic';
import activate from './activateSlice';

export const store = configureStore({
    reducer : { 
        auth,
        activate
    }
})