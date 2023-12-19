import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {User} from '../../types/user';
// type User = {
//   _id?: string;
//   name: string;
//   email: string;
//   role: string;
//   image?: {url?: string; public_id?: string};
// };
type InitialState = {
  user: User | null;
  token: string;
  isLoggedIn: boolean;
};
const initialState: InitialState = {
  user: null,
  token: '',
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    setSignOut: state => {
      state.token = '';
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.userAuth.isLoggedIn;
export const selectUser = (state: RootState) => state.userAuth.user;
export const selectToken = (state: RootState) => state.userAuth.token;

export const {setSignIn, setSignOut} = authSlice.actions;
export default authSlice.reducer;
