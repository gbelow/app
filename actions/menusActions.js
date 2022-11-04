import {MENUS_REQUEST, PUBLIC_MENUS_REQUEST} from '../config/constants';

export const menusRequest = () => ({
  type: MENUS_REQUEST,
});

export const publicMenusRequest = () => ({
  type: PUBLIC_MENUS_REQUEST,
});
