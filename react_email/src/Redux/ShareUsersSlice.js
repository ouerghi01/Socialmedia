import { createSlice } from "@reduxjs/toolkit";
const ShareUsersSlice=createSlice(
    {
      name:"shareUsers",
      initialState:{
        ShareUsers: {
            email: "",
            image: "",
            show:false,           
        },
      },
      reducers:{
        setShareUsers: (state, action) => {
            state.ShareUsers.email = action.payload.email;
            state.ShareUsers.image = action.payload.image;
            state.ShareUsers.show = action.payload.show;
        },
        removeEventListener: function(state){
            state.ShareUsers.show = false;
        }

      },

    }

);
export const selectShareUsers = (state) => state.shareUsers.ShareUsers;
export const { setShareUsers, removeEventListener } = ShareUsersSlice.actions;
export default ShareUsersSlice.reducer;