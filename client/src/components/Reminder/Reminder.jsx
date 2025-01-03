import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Reminder.module.sass';
import CONSTANTS from '../../constants';
import { countRemindEvents, getEvents } from '../../store/slices/eventSlice';
const { useState, useEffect } = React;

const Reminder = ({ events, countRemindEvents, getEvents }) => {
  const [tick, setTick] = useState(false);
  const eventRemind = events.map((event) => {
    const date = new Date(`${event.dateRemind}T${event.timeRemind}`);
    if (Date.parse(date) <= Date.now()) return 1;
    else return 0;
  });

  const sum = eventRemind.reduce((acc, e) => acc + e, 0);
  useEffect(() => {
    getEvents();
    countRemindEvents(sum);
  }, [sum]);
  useEffect(() => {
    const timerID = setInterval(() => setTick(!tick), 1000);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <div className={styles.remindConteiner}>
      <Link to="./events">
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}calendar-text-outline.svg`}
          alt="calendar-text-outline"
        />
        <div>{sum}</div>
      </Link>
    </div>
  );
};
const mStP = (state) => ({
  events: state.event.event,
});
const mDtp = (dispatch) => ({
  countRemindEvents: (values) => dispatch(countRemindEvents(values)),
  getEvents: (values) => dispatch(getEvents(values)),
});

export default connect(mStP, mDtp)(Reminder);
