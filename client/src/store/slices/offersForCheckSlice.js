import { createSlice } from '@reduxjs/toolkit';
import emailjs from '@emailjs/browser';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  rejectedReducer,
  createExtraReducers,
} from '../../utils/store';

const OFFERS_FOR_CHECK_SLICE_NAME = 'offersForCheck';

const initialState = {
  isFetching: true,
  error: null,
  isEditOffer: false,
  offers: [],
  page: { offset: 0 },
  image: { isShowOnFull: false, imagePath: null },
  checkedOffers: [],
};

export const getOffersForCheck = decorateAsyncThunk({
  key: `${OFFERS_FOR_CHECK_SLICE_NAME}/getOffers`,
  thunk: async (payload) => {
    const { data: offers } = await restController.getOffersForModeration(
      payload
    );
    return offers;
  },
});

const getOffersForModerationExtraReducers = createExtraReducers({
  thunk: getOffersForCheck,
  pendingReducer: (state) => {
    state.isFetching = true;
    state.error = null;
    state.offers = [];
  },
  fulfilledReducer: (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.offers = payload;
  },
  rejectedReducer,
});

export const setModerationStatusOfOffers = decorateAsyncThunk({
  key: `${OFFERS_FOR_CHECK_SLICE_NAME}/setOfferStatus`,
  thunk: async (payload) => {
    const { data } = await restController.setModerationStatusOfOffers(payload);

    return data;
  },
});

const setOfferStatusExtraReducers = createExtraReducers({
  thunk: setModerationStatusOfOffers,
  fulfilledReducer: (state, { payload }) => {
    const templateParams = {
      to_name: `${payload[0].User.firstName}`,
      message: `${payload[0].moderation}`,
      to_email: `${payload[0].User.email}`,
    };
    emailjs
      .send(
        'service_nu1ai38',
        'template_vetdx2b',
        templateParams,
        'fGxg1uRhj2xA42t6l'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
    state.checkedOffers = [...state.checkedOffers, ...payload];

    state.error = null;
  },
  rejectedReducer,
});

const extraReducers = (builder) => {
  setOfferStatusExtraReducers(builder);
  getOffersForModerationExtraReducers(builder);
};
const reducers = {
  loadOfferListPage: (state, { payload }) => {
    state.page.offset = payload;
  },
  changeShowImageOffer: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.image.isShowOnFull = isShowOnFull;
    state.image.imagePath = imagePath;
  },
};
const offersForCheckSlice = createSlice({
  name: OFFERS_FOR_CHECK_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});
const { actions, reducer: offerForCheckReducer } = offersForCheckSlice;
export const { changeShowImageOffer, loadOfferListPage } = actions;

export default offerForCheckReducer;
