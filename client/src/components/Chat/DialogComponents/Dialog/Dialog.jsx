import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

const Dialog = (props) => {
  const messagesEnd = useRef(null);
  const { userId, messages } = props;
  let chatData = props.chatData || { blackList: [] };

  useEffect(() => {
    if (chatData.id)
      props.getDialog({
        interlocutorId: props.interlocutor.id,
        chatId: chatData.id,
      });
    return () => {
      props.clearMessageList();
    };
  }, [props.interlocutor.id]);

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();
    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.userId ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <div ref={messagesEnd} />
        </div>
      );
    });

    return <div className={styles.messageList}>{messagesArray}</div>;
  };
  useEffect(() => {
    scrollToBottom();
  }, [mainDialog]);

  const blockMessage = () => {
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  return (
    <>
      <ChatHeader userId={userId} />
      {mainDialog()}
      {chatData && chatData.blackList.includes(true) ? (
        blockMessage()
      ) : (
        <ChatInput chatId={chatData.id || null} />
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
