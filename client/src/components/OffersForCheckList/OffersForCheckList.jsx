import React from 'react';
import { connect } from 'react-redux';
import { getOffersForCheck } from '../../store/slices/offersForCheckSlice';
import OfferItem from './OfferItem/OfferItem';
import styles from './OffersForCheckList.module.sass';
import { loadOfferListPage } from '../../store/slices/offersForCheckSlice';
import { confirmAlert } from 'react-confirm-alert';
import { setModerationStatusOfOffers } from '../../store/slices/offersForCheckSlice';
const { useEffect } = React;

const OffersForCheckList = ({
  setModerationStatusOfOffers,
  loadOfferListPage,
  offersForCheckStore,
  getOffers,
}) => {
  const { offers } = offersForCheckStore;
  const {
    page: { offset },
  } = offersForCheckStore;

  useEffect(() => {
    getOffers({ limit: 5, offset });
  }, [offset]);

  const checkedOffer = (modDataC) => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setModerationStatusOfOffers(modDataC);
            getOffers({ limit: 5, offset });
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
  const declineOffer = (modDataD) => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',

          onClick: () => {
            setModerationStatusOfOffers(modDataD);
            getOffers({ limit: 5, offset });
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
  const offersList = offers.map((offer) => (
    <OfferItem
      checkedOffer={checkedOffer}
      declineOffer={declineOffer}
      key={offer.id}
      offer={offer}
    />
  ));
  const offerListPageNext = () => {
    if (offers.length > 4) loadOfferListPage(offset + 5);
  };

  const offerListPageBack = () => {
    if (offset >= 5) loadOfferListPage(offset - 5);
  };

  return (
    <>
      <div className={styles.offerContainer}>
        <ul>
          {offers.length === 0 ? (
            <h3>There are no offers for check</h3>
          ) : (
            offersList
          )}
        </ul>
        <div>
          <button className={styles.offerListBtn} onClick={offerListPageNext}>
            Next
          </button>
          <button className={styles.offerListBtn} onClick={offerListPageBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { offersForCheckStore } = state;
  return { offersForCheckStore };
};

const mapDispatchToProps = (dispatch) => ({
  setModerationStatusOfOffers: (payload) =>
    dispatch(setModerationStatusOfOffers(payload)),
  getOffers: (params) => dispatch(getOffersForCheck(params)),
  loadOfferListPage: (offset) => dispatch(loadOfferListPage(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersForCheckList);
