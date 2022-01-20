import { types } from './../types/types';

export const usersLoaded = (users) => ({
    type: types.userList,
    payload: users
})

export const userLogout = () => ({
    type: types.userLogout
})