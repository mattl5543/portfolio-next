import {createStore} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

// create your reducer
const reducer = (state = {tick: 'init'}, action) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload}
        case 'TICK':
            return {...state, tick: action.payload}
        case 'MAX_TIME':
            return {...state, globalMaxTime: action.payload}
        case 'TIME_SPEED':
            return {...state, globalTimeSpeed: action.payload}
        case 'TICK_RATE':
            return {...state, globalTickRate: action.payload}
        case 'GLOBAL_TIME':
            return {...state, globalTime: action.payload}
        default:
            return state
    }
}

// create a makeStore function
const makeStore = context => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});