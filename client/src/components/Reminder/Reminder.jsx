import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styles from './Reminder.module.sass';
import CONSTANTS from '../../constants';
const { useState, useEffect } = React;

const Reminder = ({ events }) => {
  const [tick, setTick] = useState(false);
  const eventRemind = events.map((event) => {
    const date = new Date(`${event.dateRemind}T${event.timeRemind}`);
    if (Date.parse(date) <= Date.now()) return 1;
    else return 0;
  });

  const sum = eventRemind.reduce((acc, e) => acc + e, 0);

  useEffect(() => {
    const timerID = setInterval(() => setTick(!tick), 5000);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <div className={styles.remindConteiner}>
      <Link to="./events">
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}calendar-text-outline.svg`}
          alt="calendar-text-outline"
        />
        <div>{'0' && sum}</div>
      </Link>
    </div>
  );
};
const mStP = (state) => ({
  events: state.event.event,
});

export default connect(mStP, null)(Reminder);
