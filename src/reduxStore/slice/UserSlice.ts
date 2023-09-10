import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    token: '',
    sessionId: '',
    accountId: '',
  },
  reducers: {
    login: (state, action) => {
      const {payload} = action;
      state.userName = payload.userName;
      state.token = payload.token;
      state.sessionId = payload.sessionId;
      state.accountId = payload.accountId;
    },
    // Add a logout action to clear user data
    logout: state => {
      state.userName = '';
      state.token = '';
      state.sessionId = '';
      state.accountId = '';
    },
  },
});

export const {login, logout} = UserSlice.actions;
export default UserSlice.reducer;
