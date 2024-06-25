import React from 'react';
import styles from './EventList.module.sass';
import { connect } from 'react-redux';
import EventTimer from '../eventTimer';

const EventList = ({ events }) => {
  const eventItems = events.map((event) => (
    <EventItems key={event.id} event={event} />
  ));
  // handleDeleteClick();

  return <ul className={styles.eventList}>{eventItems}</ul>;
};

function EventItems({ event }) {
  return (
    <li className={styles.eventItem}>
      <p className={styles.eventText}>{event.text}</p>
      <div>
        <EventTimer date={new Date(`${event.date}T${event.time}`)} />
        <button className={styles.eventDelete}>Delete</button>
      </div>
    </li>
  );
}

const mStP = (state) => ({
  events: state.event.event,
});
export default connect(mStP, null)(EventList);
