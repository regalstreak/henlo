import { ADD_PREFIX, ADD_CONTACTS } from './types';
import { combineReducers } from 'redux';

const initState = {
    prefixes: ['abc', 'bcd'],
    contacts: {
        abc: [
            {
                recordID: '6b2237ee0df85980',
                givenName: 'Carl',
                phoneNumbers: [{
                    label: 'mobile',
                    number: '(555) 555-5555',
                }],
            },
            {
                recordID: '6b2237ee0df85980',
                givenName: '12Carl',
                phoneNumbers: [{
                    label: 'mobile',
                    number: '(555) 555-5555',
                }],
            },
        ],
        bcd: [
            {
                recordID: '6b2237ee0df85980',
                givenName: 'wCwawdarl',
                phoneNumbers: [{
                    label: 'mobile',
                    number: '(555) 555-5555',
                }],
            },
            {
                recordID: '6b2237ee0df85980',
                givenName: 'awdCarl',
                phoneNumbers: [{
                    label: 'mobile',
                    number: '(555) 555-5555',
                }],
            },
        ],
    },
};

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_PREFIX: {
            return {
                ...state.contacts,
                prefixes: [...state.prefixes, action.payload],
            };
        }
        case ADD_CONTACTS: {
            return {
                ...state,
            };
        }
        default: {
            return state;
        }
    }
};


export default combineReducers({
    main: mainReducer,
});

