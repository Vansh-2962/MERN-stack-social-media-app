import {createSlice} from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser:null,
        otherUsers:null,
        tweetPost:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers = action.payload
        },
        setTweetPost:(state,action)=>{
            state.tweetPost = action.payload
        }
    }
})

export const {setAuthUser,setOtherUsers,setTweetPost} = userSlice.actions;
export default userSlice.reducer;