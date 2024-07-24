import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            email: "",
            token: "", 
            imageBas64: "",           
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user.email = action.payload.name;
            state.user.token = action.payload.token;
            state.user.imageBas64 = action.payload.imageBas64;
        },
        removeUser: (state) => {
            state.user = { email: "", token: "" , imageBas64: ""};
        },
    },
});

export const selectUser = (state) => state.user.user;
export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
