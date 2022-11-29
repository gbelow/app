import { put, call, takeLatest } from "redux-saga/effects";

import { fetchMenus, fetchPublicMenus } from "../services/menusApi";

import {
  MENUS_REQUEST,
  MENUS_REQUEST_SUCCESS,
  PUBLIC_MENUS_REQUEST,
  PUBLIC_MENUS_REQUEST_SUCCESS,
} from "../config/constants";

import images from "../const/images";

import { packageName } from "../package.json";

const fetch = function* () {
  const request = yield call(fetchMenus);

  const test = {
    categoryId: 1,
    routeName: "Sales",
    icon: "newspaper-o",
    id: 99,
    name: "Vendedor",
    position: "grid",
    submenus:[],
    type: "content",
  };

  if (request.response) {
    const side = [];
    const grid = [];
    const both = [];

    side.push(test);
    grid.push(test);
    both.push(test);

    request.response.data.map((item) => {
      if (item.type === "sales") {
        item.routeName = "PendingSales";
      } else if (item.type === "clients") {
        item.routeName = "Customers";
      } else if (item.type === "lottery") {
        item.routeName = "Lottery";
      } else if (item.type === "history") {
        item.routeName = "History";
      } else if (item.type === "content") {
        item.routeName = "Content";
      } else if (item.type === "product") {
        item.routeName = "Products";
      } else if (item.type === "devolutions") {
        item.routeName = "Devolutions";
      } else if (item.type === "home") {
        item.routeName = "Home";
      } else if (item.type === "helpme") {
        item.routeName = "Faq";
      } else if (item.type === "about") {
        item.routeName = "About";
      } else if (item.type === "ranking") {
        item.routeName = "ActionRanking";
      } else if (item.type === "profile") {
        item.routeName = "Profile";
      } else if (item.type === "ra") {
        item.routeName = "RA";
      } else if (item.type === "pilot-photo") {
        item.routeName = "PilotFilePhoto";
      } else if (item.type === "digital-stamp") {
        item.routeName = "DigitalStamp";
      }

      if (item.position === "both" || item.position === "side") {
        side.push(item);
      }

      if (item.position === "both" || item.position === "grid") {
        grid.push(item);
      }

      both.push(item);
    });

    yield put({
      type: MENUS_REQUEST_SUCCESS,
      payload: {
        data: {
          side,
          grid,
          both,
        },
      },
    });
  }
};

const fetchPublic = function* () {
  const request = yield call(fetchPublicMenus);

  const test = {
    categoryId: 1,
    routeName: "Sales",
    icon: "newspaper-o",
    id: 99,
    name: "Vendedor",
    position: "grid",
    submenus:[],
    type: "content",
  };

  if (request.response) {
    const side = [];
    const grid = [];
    const both = [];

    side.push(test);
    grid.push(test);
    both.push(test);

    request.response.data.map((item) => {
      if (item.type === "content") {
        item.routeName = "Content";
      } else if (item.type === "home") {
        item.routeName = "HomePublic";
      } else if (item.type === "helpme") {
        item.routeName = "Faq";
      } else if (item.type === "about") {
        item.routeName = "About";
      } else if (item.type === "ra") {
        item.routeName = "RA";
      } else if (item.type === "pilot-photo") {
        item.routeName = "PilotFilePhoto";
      } else if (item.type === "digital-stamp") {
        item.routeName = "DigitalStamp";
      } else {
        return;
      }

      if (item.position === "both" || item.position === "side") {
        side.push(item);
      }

      if (item.position === "both" || item.position === "grid") {
        grid.push(item);
      }

      both.push(item);
    });

    yield put({
      type: PUBLIC_MENUS_REQUEST_SUCCESS,
      payload: {
        data: {
          side,
          grid,
          both,
        },
      },
    });
  }
};

const watchMenusSaga = function* () {
  return yield [
    takeLatest(MENUS_REQUEST, fetch),
    takeLatest(PUBLIC_MENUS_REQUEST, fetchPublic),
  ];
};

export default watchMenusSaga;
