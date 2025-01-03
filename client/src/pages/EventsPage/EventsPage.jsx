import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EventsPage.module.sass';
import Spinner from '../../components/Spinner/Spinner';
import { getEvents } from '../../store/slices/eventSlice';
import EventForm from '../../components/EventComponents/EventForm/EventForm';
import EventList from '../../components/EventComponents/EventList/EventList';
import CONSTANTS from '../../constants';
const Events = (props) => {
  const { isFetching, events, getEvents, role, countRemindEvents } = props;
  if (role !== CONSTANTS.CUSTOMER) {
    props.history.replace('/');
  }
  useEffect(() => {
    getEvents();
  }, [events.length, countRemindEvents]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAddEvent = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.eventWrap}>
            <article>
              <div className={styles.eventContainer}>
                <div className={styles.eventHeader}>
                  <h2>Live upcomming checks</h2>
                  <div className={styles.eventHeaderIcon}>
                    <p>Remaining time</p>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}clock-time-eight-outline.svg`}
                      alt="menu"
                    />
                  </div>
                </div>
                <EventList events={events} />
              </div>
            </article>
            <aside>
              <button
                className={styles.eventCreateButton}
                onClick={handleAddEvent}
              >
                Add event
              </button>
            </aside>
          </div>
          {isModalVisible && (
            <EventForm
              closeModal={(e) => {
                setIsModalVisible(false);
              }}
            />
          )}

          <Footer />
        </>
      )}
    </>
  );
};

const mStP = (state) => ({
  events: state.event.event,
  countRemindEvents: state.event.countRemindEvents,
  role: state.userStore.data.role,
  isFetching: state.userStore.isFetching,
});
const mDtp = (dispatch) => ({
  getEvents: (values) => dispatch(getEvents(values)),
});

export default connect(mStP, mDtp)(Events);
