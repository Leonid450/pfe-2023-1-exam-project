import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import cx from 'classnames';
import Footer from '../../components/Footer/Footer';
import styles from './EventsPage.module.sass';
import Spinner from '../../components/Spinner/Spinner';
import EventForm from '../../components/EventComponents/EventForm/EventForm';
import EventList from '../../components/EventComponents/EventList/EventList';

const events = [
  {
    text: 'some new event',
    date: '12.12.2012',
    time: '15:30',
  },
  {
    text: 'some new event 2',
    date: '12.12.2012',
    time: '15:30',
  },
];
const Events = (props) => {
  const { isFetching } = props;
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   getUsers().then((response) => {
  //     setUsers(response.data.data);
  //   });
  // }, []);

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
                    <p>remaining time</p>
                    <img src="" alt="" />
                  </div>
                </div>
                <EventList events={events} />

                {/* <div className={styles.eventList}>
                  <div className={styles.eventItem}>
                    <p>some event</p>
                  </div>
                  <div className={styles.eventItem}>
                    <p>some other event</p>
                  </div>
                </div> */}
              </div>
            </article>
          </div>
          <EventForm />
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(Events);
