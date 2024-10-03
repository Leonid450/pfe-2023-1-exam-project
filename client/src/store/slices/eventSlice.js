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
    deleteEvent: (state, action) => {
      state.event = [
        ...state.event.filter((event) => event.id !== action.payload),
      ];
    },
  },
});

const { actions, reducer: eventReducer } = eventSlice;
export const { createEvent, deleteEvent } = actions;
export default eventReducer;
