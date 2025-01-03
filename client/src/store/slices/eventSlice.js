import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  event: [],
  countRemindEvents: 0,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEvents: (state, action) => {
      state.event = JSON.parse(window.localStorage.eventsInLS || '[]');
      state.event.sort((a, b) => {
        if (a.dateN > b.dateN) return 1;
        if (a.dateN < b.dateN) return -1;
        return 0;
      });
    },
    countRemindEvents: (state, action) => {
      state.countRemindEvents = action.payload;
    },
    createEvent: (state, action) => {
      state.event = [action.payload, ...state.event];
      window.localStorage.eventsInLS = JSON.stringify(state.event);
    },
    deleteEvent: (state, action) => {
      state.event = [
        ...state.event.filter((event) => event.id !== action.payload),
      ];
      window.localStorage.eventsInLS = JSON.stringify(state.event);
    },
  },
});

const { actions, reducer: eventReducer } = eventSlice;
export const { createEvent, deleteEvent, getEvents, countRemindEvents } =
  actions;
export default eventReducer;
