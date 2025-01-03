import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from '../../../../store/slices/chatSlice';
import { chatController } from '../../../../api/ws/socketController';
import CONSTANTS from '../../../../constants';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../../../ChatError/ChatError';

const Chat = (props) => {
  useEffect(() => {
    chatController.subscribeChat(props.userStore.data.userId);
    props.getPreviewChat();
    return () => {
      chatController.unsubscribeChat(props.userStore.data.userId);
    };
  }, []);
  const { isExpanded, isShow, isShowCatalogCreation, error } = props.chatStore;
  const { userId } = props.userStore.data;
  const { changeShow, getPreviewChat } = props;

  const DialogList = () => {
    const { setChatPreviewMode } = props;
    const { chatMode, isShowChatsInCatalog } = props.chatStore;
    const {
      NORMAL_PREVIEW_CHAT_MODE,
      FAVORITE_PREVIEW_CHAT_MODE,
      BLOCKED_PREVIEW_CHAT_MODE,
      CATALOG_PREVIEW_CHAT_MODE,
    } = CONSTANTS;
    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
              })}
            >
              Normal
            </span>
            <span
              onClick={() => setChatPreviewMode(FAVORITE_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === FAVORITE_PREVIEW_CHAT_MODE,
              })}
            >
              Favorite
            </span>
            <span
              onClick={() => setChatPreviewMode(BLOCKED_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE,
              })}
            >
              Blocked
            </span>
            <span
              onClick={() => setChatPreviewMode(CATALOG_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE,
              })}
            >
              Catalog
            </span>
          </div>
        )}
        {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={userId} />
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={getPreviewChat} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={userId} /> : DialogList()}
      <div className={styles.toggleChat} onClick={() => changeShow()}>
        {isShow ? 'Hide Chat' : 'Show Chat'}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
