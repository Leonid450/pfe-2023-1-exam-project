import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import cx from 'classnames';
import Footer from '../../components/Footer/Footer';
import styles from './OffersForCheckPage.module.sass';
import Spinner from '../../components/Spinner/Spinner';
import LightBox from 'react-18-image-lightbox';
import { changeShowImageOffer } from '../../store/slices/offersForCheckSlice';

import OffersForCheckList from '../../components/OffersForCheckList/OffersForCheckList';
import CONSTANTS from '../../constants';

const OffersForCheckPage = (props) => {
  if (props.userStore.data.role !== CONSTANTS.MODERATOR) {
    props.history.replace('/');
  }
  const { isFetching, changeShowImageOffer } = props;
  const { isShowOnFull, imagePath } = props.offersForCheckStore.image;

  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {isShowOnFull && (
            <LightBox
              mainSrc={`${CONSTANTS.publicContestsURL}${imagePath}`}
              onCloseRequest={() =>
                changeShowImageOffer({ isShowOnFull: false, imagePath: null })
              }
            />
          )}
          <div className={styles.contestCheckWrap}>
            <article>
              <div className={styles.contestCheckContainer}>
                <div className={styles.contestCheckHeader}>
                  <h2>Offers for check</h2>
                </div>
                <OffersForCheckList />
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
  const { userStore, offersForCheckStore } = state;
  return { isFetching, userStore, offersForCheckStore };
};
const mapDispatchToProps = (dispatch) => ({
  changeShowImageOffer: (data) => dispatch(changeShowImageOffer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersForCheckPage);
