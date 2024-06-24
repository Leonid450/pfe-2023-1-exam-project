import React from 'react';
import styles from './EventList.module.sass';
import { connect } from 'react-redux';
import EventTimer from '../eventTimer';

// import EventItem from './EventItem';
const EventList = ({ events }) => {
  // handleDeleteClick();
  const eventItems = events.map((event) => (
    <div className={styles.eventItem}>
      <p>{event.text}</p>
      <div>
        Date:
        {event.date}, Time:
        {event.time}
      </div>
      <div></div>
      <EventTimer date={new Date(`${event.date}T${event.time}`)} />

      <button>
        <p>Delete</p>
      </button>
    </div>
  ));
  // const dateN = events.map((event) => {event.date + event.time});

  return <section className={styles.eventList}>{eventItems}</section>;
};
const mStP = (state) => ({
  events: state.event.event,
});
export default connect(mStP, null)(EventList);
