import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  event: [],
};
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.event = [action.payload, ...state.event];
    },
  },
});
const { actions, reducer: eventReducer } = eventSlice;
export const { createEvent } = actions;
export default eventReducer;
