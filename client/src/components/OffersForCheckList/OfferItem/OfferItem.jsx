import React from 'react';
import styles from './OfferItem.module.sass';
import { connect } from 'react-redux';
import CONSTANTS from '../../../constants';
import { changeShowImageOffer } from '../../../store/slices/offersForCheckSlice';

const OfferItem = ({
  offer,
  checkedOffer,
  declineOffer,
  changeShowImageOffer,
}) => {
  const modDataC = [offer.id, 'checked'];

  const modDataD = [offer.id, 'decline'];

  return (
    <div>
      <li className={styles.offerItem}>
        {offer.fileName ? (
          <img
            className={styles.responseLogo}
            src={`${CONSTANTS.publicContestsURL}${offer.fileName}`}
            alt="logo"
            onClick={() => {
              changeShowImageOffer({
                isShowOnFull: true,
                imagePath: offer.fileName,
              });
            }}
          />
        ) : (
          <p>{offer.text}</p>
        )}
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              checkedOffer(modDataC);
            }}
            className={styles.buttonChecked}
          >
            Checked
          </button>
          <button
            onClick={() => {
              declineOffer(modDataD);
            }}
            className={styles.buttonDecline}
          >
            Decline
          </button>
        </div>
      </li>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  changeShowImageOffer: (data) => dispatch(changeShowImageOffer(data)),
});
export default connect(null, mapDispatchToProps)(OfferItem);
