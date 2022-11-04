import {put, call, takeLatest} from 'redux-saga/effects';

import {NavigationActions} from 'react-navigation';
import {fetch, fetchDetail} from '../services/productApi';

import {
  CAVABEN_REQUEST,
  CAVABEN_REQUEST_SUCCESS,
  PRODUCTS_REQUEST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_REQUEST_SUCCESS,
  NAVIGATE,
} from '../config/constants';

const fetchProducts = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({type: CAVABEN_REQUEST_SUCCESS, payload: request.response});

    let products = [];

    yield call(() => {
      request.response.data.map((item) => {
        if (item.groups) {
          item.groups.map((group) => {
            if (group.products) {
              group.products.map((product) => {
                const reference = product.reference || '';
                const description = product.description || '';

                product.searchText =
                  reference.toString().replace(/[.]/g, '') +
                  description.toLowerCase();
                products.push(product);
              });
            }
          });
        }
      });
    });

    yield put({type: PRODUCTS_REQUEST_SUCCESS, payload: products});
  }
};

const fetchProductDetail = function* (action) {
  const request = yield call(fetchDetail, action.payload);

  if (request.response) {
    yield put({
      type: PRODUCT_DETAIL_REQUEST_SUCCESS,
      payload: request.response,
    });
    yield put(
      NavigationActions.navigate({
        routeName: 'ContentDetail',
        params: {
          item: request.response.data,
        },
      }),
    );
  }
};

const watchCavabenSaga = function* () {
  return yield [
    takeLatest(CAVABEN_REQUEST, fetchProducts),
    takeLatest(PRODUCT_DETAIL_REQUEST, fetchProductDetail),
  ];
};

export default watchCavabenSaga;
