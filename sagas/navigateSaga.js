import {put, call, takeLatest} from 'redux-saga/effects';

import {Alert, Platform} from 'react-native';

import {delay} from 'redux-saga';
import {NavigationActions} from 'react-navigation';
import Permissions from 'react-native-permissions';
import {store} from '../app';
import {
  NAVIGATE_REQUEST,
  ACTION_REQUEST,
  LOGOUT_REQUEST,
  CAVABEN_REQUEST,
  CONTENT_REQUEST,
  CUSTOM_NAVIGATE_REQUEST,
} from '../config/constants';

const navigate = function* (action) {
  yield put(NavigationActions.navigate(action.payload));
};

const customNavigate = function* (action) {
  const menu = action.payload;
  const {session, menus, publicMenus} = store.getState();

  if (menu.type === 'sales' && !session.data.actionMember) {
    if (session.data.actions && session.data.actions.length) {
      const action = session.data.actions[0];

      if (action.type === 'loteria' || action.type === 'lottery') {
        action.routeName = 'Lottery';
      } else if (action.type === 'ranking') {
        action.routeName = 'ActionRanking';
      }

      Alert.alert(
        'Atenção',
        'Só é possível registrar vendas se você estiver inscrito em alguma ação de marketing.',
        [
          {
            text: 'Ir para ação',
            onPress: () => {
              store.dispatch({type: ACTION_REQUEST, payload: action});
              store.dispatch(
                NavigationActions.navigate({
                  routeName: action.routeName,
                  params: {
                    title: action.title,
                  },
                }),
              );
            },
          },
          {text: 'Cancelar', style: 'destructive'},
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Atenção',
        'Só é possível registrar vendas se você estiver inscrito em alguma ação de marketing.\n\n' +
          'Quando houver alguma ação ativa ela estará disponível no menu do app.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  } else if (
    Platform.OS === 'android' &&
    menu.type === 'ra' &&
    Platform.Version < 26
  ) {
    Alert.alert(
      'Atenção',
      'Seu aparelho não possui suporte ao ARCore da Google, não sendo possível acessar o módulo R.A.',
      [{text: 'Ok'}],
      {cancelable: false},
    );
  } else {
    if (menu.id) {
      if (session.data) {
        menus.data.both.map((item) => {
          if (item.id === menu.id) {
            menu.routeName = item.routeName;
          }
        });
      } else {
        publicMenus.data.both.map((item) => {
          if (item.id === menu.id) {
            menu.routeName = item.routeName;
          }
        });
      }

      let cameraPermission,
        photoPermission = false;

      if (menu.type === 'pilot-photo') {
        yield Permissions.request('camera').then((response) => {
          if (response === 'authorized') {
            cameraPermission = true;
          }
        });
        yield Permissions.request('photo').then((response) => {
          if (response === 'authorized') {
            photoPermission = true;
          }
        });
      }

      if (
        menu.type !== 'pilot-photo' ||
        (cameraPermission && photoPermission)
      ) {
        yield put(
          NavigationActions.navigate({
            routeName: menu.routeName,
            params: {
              title: menu.name,
            },
          }),
        );
      }
    }

    if (menu.url) {
      yield put(
        NavigationActions.navigate({
          routeName: 'WebContainer',
          params: {
            title: menu.name,
            url: menu.url,
          },
        }),
      );
    } else if (menu.type === 'exit') {
      yield put({type: LOGOUT_REQUEST});
    } else if (menu.actionId) {
      yield put({type: ACTION_REQUEST, payload: menu});
    } else if (menu.type === 'product') {
      yield put({type: CAVABEN_REQUEST, payload: menu.categoryId});
    } else if (menu.categoryId) {
      yield put({type: CONTENT_REQUEST, payload: menu});
    }
  }
};

const watchNavigateSaga = function* () {
  return yield [
    takeLatest(NAVIGATE_REQUEST, navigate),
    takeLatest(CUSTOM_NAVIGATE_REQUEST, customNavigate),
  ];
};

export default watchNavigateSaga;
