import http from '../interceptor';

export const registerRequest = (data) => http.post('auth/registration', data);
export const loginRequest = (data) => http.post('auth/login', data);
export const getUser = () => http.get('auth/getUser');
export const updateContest = (data) =>
  http.put(`contests/${data.get('contestId')}`, data);
export const setNewOffer = (data) => http.post('contests/setNewOffer', data);
export const setOfferStatus = (data) =>
  http.put('contests/setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.get(`contests/downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('users/pay', data.formData);
export const changeMark = (data) => http.put('users/changeMark', data);
export const getPreviewChat = () => http.get('chats/getPreview');
export const getDialog = (data) =>
  http.get('chats/getChat', { params: { ...data } });
export const dataForContest = (data) =>
  http.post('contests/dataForContest', data);
export const cashOut = (data) => http.post('users/cashout', data);
export const updateUser = (data) => http.put('users/updateUser', data);
export const newMessage = (data) => http.post('chats/newMessage', data);
export const changeChatFavorite = (data) => http.put('chats/favorite', data);
export const changeChatBlock = (data) => http.put('chats/blackList', data);
export const getCatalogList = () => http.get('chats/getCatalogs');
export const addChatToCatalog = (data) =>
  http.post('chats/addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('chats/createCatalog', data);
export const deleteCatalog = (data) =>
  http.delete(`chats/deleteCatalog/${data.catalogId}`);
export const removeChatFromCatalog = (data) =>
  http.delete(`chats/removeChatFromCatalog/${data.chatId}/${data.catalogId}`);
export const changeCatalogName = (data) =>
  http.put('chats/updateNameCatalog', data);
export const getCustomersContests = (data) =>
  http.get('contests/customers', {
    params: {
      status: data.contestStatus,
      limit: data.limit,
      offset: data.offset,
    },
  });

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.get('contests/', {
    params: {
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries,
    },
  });

export const getContestById = (data) => http.get(`contests/${data.contestId}`);
export const setModerationStatusOfOffers = (data) =>
  http.post('offers/checked', data);
export const getOffersForModeration = (data) =>
  http.get('offers/offersList', { params: { ...data } });
