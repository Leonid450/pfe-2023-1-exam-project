import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import cx from 'classnames';
import Footer from '../../components/Footer/Footer';
import styles from './ContestsForCheckPage.module.sass';
import Spinner from '../../components/Spinner/Spinner';

// import ContestCheckList from '../../components/ContestCheckList/ContestCheckList/ContestCheckList';
import CONSTANTS from '../../constants';

const ContestsForCheckPage = (props) => {
  if (props.userStore.data.role !== CONSTANTS.MODERATOR) {
    props.history.replace('/');
  }
  const { isFetching } = props;

  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.contestCheckWrap}>
            <article>
              <div className={styles.contestCheckContainer}>
                <div className={styles.contestCheckHeader}>
                  <h2>Offers for check</h2>
                </div>
                {/* <ContestCheckList /> */}
              </div>
            </article>
            <aside></aside>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  const { userStore } = state;
  return { isFetching, userStore };
};
// const mapStateToProps = (state) => {
//   const { bundleStore, userStore } = state;
//   return { bundleStore, userStore };
// };

export default connect(mapStateToProps, null)(ContestsForCheckPage);
