import cx from 'classnames';
import React from 'react';
// import styles from './EventItem.module.sass';
// import { getCurrentChat } from '../../../redux/slices/currentChatSlice';
// import { useDispatch } from 'react-redux';

function EventItem({
  event: { _id, isPrivate, name, messages, coverImage: imgUrl },
  Id,
}) {
  // const dispatch = useDispatch();
  // const lastMsg = messages.slice(-1)[0];
  // const {
  //   author: { firstName, lastName },
  //   text,
  // } = lastMsg || { author: {} };

  // const chatItemStyle = cx(styles.chatItem, {
  //   [styles.active]: _id === chatId,
  // });

  const clickHandler = (chatId) => {
    dispatch(getCurrentChat(chatId));
  };

  return (
    <li key={_id} className={chatItemStyle} onClick={() => clickHandler(_id)}>
      <section className={styles.chatInfo}>
        <div>
          <h2 className={styles.chatHeader}>{name}</h2>
          {text && (
            <p className={styles.lastMessage}>
              {firstName} {lastName}: {text}
            </p>
          )}
        </div>
      </section>
    </li>
  );
}

export default EventItem;
