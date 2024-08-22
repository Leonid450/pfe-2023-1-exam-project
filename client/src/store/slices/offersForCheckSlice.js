import { createSlice } from '@reduxjs/toolkit';
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
//---------- getOffers
export const getOffersForCheck = decorateAsyncThunk({
  key: `${OFFERS_FOR_CHECK_SLICE_NAME}/getOffers`,
  thunk: async ({ limit, offset }) => {
    const { data: offers } = await restController.getOffersForModeration(
      limit,
      offset
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
//--------set offer
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
    state.checkedOffers = [...state.checkedOffers, ...payload];
    state.error = null;
    console.log(payload);
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
