import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-18-image-lightbox';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-18-image-lightbox/style.css';
import Error from '../../components/Error/Error';

const ContestPage = (props) => {
  const { role } = props.userStore.data;

  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = props.contestByIdStore;
  const { params } = props.match;
  useEffect(() => {
    props.getData({ contestId: params.id });
    return () => {
      props.changeEditContest(false);
    };
  }, []);

  const setOfferStatus = (creatorId, offerId, command) => {
    props.clearSetOfferStatusError();
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId: orderId,
      priority: priority,
      contestId: id,
    };
    props.setOfferStatus(obj);
  };

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <OfferBox
          contestData={contestData}
          data={offers[i]}
          key={offers[i].id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          contestType={contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = props.userStore.data.userId;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = props.chatStore;
    const { userId: id } = props.userStore.data;
    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );

    if (messagesPreview.length > 0) {
      for (let i = 0; i < messagesPreview.length; i++) {
        if (isEqual(participants, messagesPreview[i].participants)) {
          return {
            participants: messagesPreview[i].participants,
            id: messagesPreview[i].id,
            blackList: messagesPreview[i].blackList,
            favoriteList: messagesPreview[i].favoriteList,
          };
        } else return null;
      }
    } else {
      return {
        participants: participants,
        blackList: [false, false],
        favoriteList: false,
        id: null,
      };
    }
  };

  const goChat = () => {
    const { User } = contestData;
    props.goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicContestsURL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={props.getData} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => props.changeContestViewMode(true)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => props.changeContestViewMode(false)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <div className={styles.offers}>{setOffersList()}</div>
              </div>
            )}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
