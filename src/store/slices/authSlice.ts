import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    uLoggedIn: boolean;
    cLoggedIn: string | null;
    aLoggedIn: boolean;
}

const storedClubInfo = localStorage.getItem('clubInfo');
const parsedClubInfo = storedClubInfo ? JSON.parse(storedClubInfo) : null;

const initialState: InitialState = {
    uLoggedIn: localStorage.getItem('uLoggedIn') ? true : false,
    cLoggedIn: parsedClubInfo,
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
        setClubLogin: (state, action) => {
            state.cLoggedIn = action.payload;
            localStorage.setItem('clubInfo', JSON.stringify(action.payload));
        },
        clubLogout: (state) => {
            state.cLoggedIn = null;
            localStorage.removeItem('clubInfo');
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