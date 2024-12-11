import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EventsPage.module.sass';
import Spinner from '../../components/Spinner/Spinner';
import EventForm from '../../components/EventComponents/EventForm/EventForm';
import EventList from '../../components/EventComponents/EventList/EventList';
import CONSTANTS from '../../constants';
const Events = (props) => {
  const { isFetching } = props;
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
                <EventList />
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

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(Events);
