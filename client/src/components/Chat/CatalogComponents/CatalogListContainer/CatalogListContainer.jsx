import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = (props) => {
  useEffect(() => {
    props.getCatalogList();
  }, []);
  const removeChatFromCatalog = (event, chatId) => {
    const { id } = props.chatStore.currentCatalog;
    props.removeChatFromCatalog({ chatId, catalogId: id });
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = props.chatStore;
    const { Conversations } = currentCatalog;
    const dialogsInCatalog = [];
    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < Conversations.length; j++) {
        if (Conversations[j].id === messagesPreview[i].id) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }
    return dialogsInCatalog;
  };

  const { catalogList, isShowChatsInCatalog } = props.chatStore;
  const { id } = props.userStore.data;
  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
