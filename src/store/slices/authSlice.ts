import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    uLoggedIn: boolean;
    cLoggedIn: boolean;
    aLoggedIn: boolean;
}

const initialState: InitialState = {
    uLoggedIn: localStorage.getItem('uLoggedIn') ? true : false,
    cLoggedIn: localStorage.getItem('cLoggedIn') ? true : false,
    aLoggedIn: localStorage.getItem('aLoggedIn') ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state) => {
            state.uLoggedIn = true;
            localStorage.setItem('uLoggedIn', 'true');
        },
        userLogout: (state) => {
            state.uLoggedIn = false;
            localStorage.removeItem('uLoggedIn');
        },
        setClubLogin: (state) => {
            state.cLoggedIn = true;
            localStorage.setItem('cLoggedIn', 'true');
        },
        clubLogout: (state) => {
            state.cLoggedIn = false;
            localStorage.removeItem('cLoggedIn');
        },
        setAdminLogin: (state) => {
            state.aLoggedIn = true;
            localStorage.setItem('aLoggedIn', 'true');
        },
        adminLogout: (state) => {
            state.aLoggedIn = false;
            localStorage.removeItem('aLoggedIn');
        }
    }
});

export const { setLogin, userLogout, setClubLogin, clubLogout, setAdminLogin, adminLogout } = authSlice.actions;

export default authSlice.reducer;