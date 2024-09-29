import React from 'react';

function EventItem({
  event: { id, isPrivate, name, messages, coverImage: imgUrl },
  Id,
}) {
  const clickHandler = (chatId) => {
    dispatch(getCurrentChat(chatId));
  };

  return (
    <li key={id} className={chatItemStyle} onClick={() => clickHandler(id)}>
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
