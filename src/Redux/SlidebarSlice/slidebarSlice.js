import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

const slidebarSlice = createSlice({
  name: 'slidebar',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.sidebarShow = action.payload
    },
  },
})

export const { changeState } = slidebarSlice.actions
export default slidebarSlice.reducer
