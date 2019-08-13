import { ADD_PREFIX, ADD_CONTACTS } from './types';

export const addPrefix = prefix => (
    {
        type: ADD_PREFIX,
        payload: prefix,
    }
);
export const addContacts = payload => (
    {
        type: ADD_CONTACTS,
        payload: payload, //should contain prefix + contacts
    }
);
