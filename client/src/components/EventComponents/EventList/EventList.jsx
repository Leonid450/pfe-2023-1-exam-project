import React from 'react';
import styles from './EventList.module.sass';
import { connect } from 'react-redux';
import EventTimer from '../eventTimer';
import { deleteEvent } from '../../../store/slices/eventSlice';
const { useState } = React;

const EventList = ({ deleteEvent, events }) => {
  const eventItems = events.map((event) => (
    <EventItems key={event.id} event={event} deleteEvent={deleteEvent} />
  ));
  return <ul className={styles.eventList}>{eventItems}</ul>;
};

function EventItems({ event, deleteEvent }) {
  const handleDeleteClick = () => {
    deleteEvent(event.id);
  };
  const [a, setA] = useState(1);
  const left = (a) => {
    a > 1 ? setA(a) : setA(1);
  };

  const s = `linear-gradient(90deg, rgba(21,236,170,0.648879620207458) ${a}%, rgba(218,218,218,1) ${a}%)`;

  return (
    <li style={{ background: s }} className={styles.eventItem}>
      <p className={styles.eventText}>{event.text}</p>
      <div className={styles.eventTime}>
        <EventTimer left={left} date={event.dateN} startDate={event.id} />
        <button onClick={handleDeleteClick} className={styles.eventDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

const mStP = (state) => ({
  events: state.event.event,
});
const mDtp = (dispatch) => ({
  deleteEvent: (values) => dispatch(deleteEvent(values)),
});
export default connect(mStP, mDtp)(EventList);
