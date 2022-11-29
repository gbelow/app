import { Platform } from "react-native";

import { put } from "redux-saga/effects";

import axios from "../config/axios";
import { store } from "../app";

import {
  ACTIVITY_INDICATOR_SHOW,
  ACTIVITY_INDICATOR_HIDE,
  ALERT_ERROR,
} from "../config/constants";

import { appId, androidVersion, iosVersion } from "../package.json";

// @name request
// @description request a HTTP a request
// @params { Object } options - HTTP options
// @returns generator fn
export const request = function* (opt, extraOptions = {}) {
  console.log("LOGING REQUEST 1---------------", axios.defaults.baseURL);
  if (!extraOptions.hideActivity) {
    yield put({ type: ACTIVITY_INDICATOR_SHOW });
  }

  const options = opt;
  const { connection, settings } = store.getState();

  options.headers = {};
  options.timeout = extraOptions.timeout || 5000;
  options.headers.Authorization =
    "Basic a2luY29kZTptWFdiRnZuZ2xHSlRZclI2ZlBWSQ==";
  options.url =
    opt.url +
    `${opt.url.includes("?") ? "&" : "?"}appId=${
      settings.data && settings.data.appId ? settings.data.appId : appId
    }&appVersion=${Platform.OS === "android" ? androidVersion : iosVersion}`;

  if (axios.defaults.baseURL.includes(":port")) {
    const port =
      settings.data && settings.data.port ? settings.data.port : "3000";

    axios.defaults.baseURL = axios.defaults.baseURL.replace(
      ":port",
      ":" + port
    );
  }
  // console.log('AXIOS REQUEST ---------', options);
  const response = yield axios
    .request(options)
    .then((res) => ({
      response: res.data,
    }))
    .catch((error) => {
      try {
        if (error && error.response) {
          return {
            error: {
              code: error.response.status,
              description: error.response.data.message,
            },
          };
        } else if (!connection) {
          return {
            error: {
              code: 503,
              description: "Você está sem internet no momento :(",
            },
          };
        }
        return {
          error: {
            code: 503,
            description:
              "Verifique sua conexão com a internet e tente novamente.",
          },
        };
      } catch (ex) {
        return {
          error: {
            code: 503,
            description:
              "Verifique sua conexão com a internet e tente novamente.",
          },
        };
      }
    });

  if (response.error) {
    if (!extraOptions.hideAlert) {
      yield put({ type: ALERT_ERROR, payload: response.error });
    }
  }

  if (!extraOptions.hideActivity) {
    yield put({ type: ACTIVITY_INDICATOR_HIDE });
  }
  console.log("REQUEST RESPONSE", response);
  return response;
};
