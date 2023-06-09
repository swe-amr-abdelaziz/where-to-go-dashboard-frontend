import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

const slidebarSlice = createSlice({
  name: 'slidebar',
  initialState,
  reducers: {
    changeState: (state = initialState, { type, ...rest }) => {
      switch (type) {
        case 'set':
          return { ...state, ...rest }
        default:
          return state
      }
    },
  },
})

export default slidebarSlice.reducer
