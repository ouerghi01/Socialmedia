import { createSlice } from "@reduxjs/toolkit";

const ShareUsersSlice=createSlice(
    {
      name:"shareUsers",
      initialState:{
        ShareUsers: {
            id: "",
            email: "",
            image: "",
            show:false,           
        },
        allUsers: new Map(),
      },
      reducers:{
        setShareUsers: (state, action) => {
            state.ShareUsers.id = action.payload.id;
            state.ShareUsers.email = action.payload.email;
            state.ShareUsers.image = action.payload.image;
            state.ShareUsers.show = action.payload.show;
            state.allUsers=state.allUsers.set(action.payload.id, state.ShareUsers);
        },
        

      },

    }

);
export const selectAllUsers = (state) => state.shareUsers.allUsers;
export const { setShareUsers } = ShareUsersSlice.actions;
export default ShareUsersSlice.reducer;