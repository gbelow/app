import React from "react";
import { Alert } from "react-native";

import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
} from "react-navigation";

import { scale } from "../helpers/scalling";
import { store } from "../app";
import { DrawerContent } from "./components";
import containers from "./containers";
import theme from "../const/theme";

const HOST = "amctextil";

const tabsOptions = {
  activeTintColor: theme.headerTintColor,
  inactiveTintColor: "#999",
  showLabel: true,
  showIcon: false,
  indicatorStyle: {
    backgroundColor: "#f9c600",
  },
  tabStyle: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    height: scale(40),
  },
  labelStyle: {
    marginVertical: 5,
    fontSize: scale(13),
  },
  style: {
    backgroundColor: theme.tabsBackgroundColor,
    padding: 5,
  },
};

export const HistoryTabs = TabNavigator(
  {
    SalesHistory: { screen: containers.SalesHistory },
    DevolutionsHistory: { screen: containers.DevolutionsHistory },
    ActionsHistory: { screen: containers.ActionsHistory },
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: tabsOptions,
  }
);

const navigationOptions = {
  navigationOptions: (props) => ({
    headerTintColor: theme.headerTintColor,
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: theme.headerBackgroundColor,
      elevation: 0,
      height: scale(47),
      borderBottomWidth: 0,
      borderBottomColor: "transparent",
      shadowColor: "transparent",
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
    headerTitleStyle: {
      alignSelf: "center",
      fontWeight: "300",
      fontSize: scale(16),
      fontFamily: theme.fontFamily,
    },
  }),
};

export const PublicNav = StackNavigator(
  {
    HomePublic: { screen: containers.HomePublic },
    Content: { screen: containers.Content },
    ContentDetail: { screen: containers.ContentDetail },
    Login: { screen: containers.Login },
    About: { screen: containers.About },
    Faq: { screen: containers.Faq },
    RA: { screen: containers.RA },
    PilotFilePhoto: { screen: containers.PilotFilePhoto },
    DigitalStamp: { screen: containers.DigitalStamp },
  },
  navigationOptions
);

export const AppNav = StackNavigator(
  {
    Home: { screen: containers.Home },
    Login: { screen: containers.Login },
    PendingSales: { screen: containers.PendingSales },
    Prizes: { screen: containers.Prizes },
    Coupons: { screen: containers.Coupons },
    ScratchCard: { screen: containers.ScratchCard },
    Lottery: { screen: containers.Lottery },
    History: { screen: HistoryTabs },
    NewSale: { screen: containers.NewSale },
    NewCustomer: { screen: containers.NewCustomer },
    Customers: { screen: containers.Customers },
    BarcodeCamera: { screen: containers.BarcodeCamera },
    Notifications: { screen: containers.Notifications },
    Devolutions: { screen: containers.Devolutions },
    DevolutionsHistory: { screen: containers.DevolutionsHistory },
    Chat: { screen: containers.Chat },
    Content: { screen: containers.Content },
    ContentDetail: { screen: containers.ContentDetail },
    About: { screen: containers.About },
    ActionRanking: { screen: containers.ActionRanking },
    Products: { screen: containers.Products },
    WebContainer: { screen: containers.WebContainer },
    Faq: { screen: containers.Faq },
    Profile: { screen: containers.Profile },
    RA: { screen: containers.RA },
    PilotFilePhoto: { screen: containers.PilotFilePhoto },
    DigitalStamp: { screen: containers.DigitalStamp },
    PDFContainer: { screen: containers.PDFContainer },
    Sales: { screen: containers.Sales },
    NewCart: {screen: containers.NewCart },
    CartDetails: {screen: containers.CartDetails },
    ChooseCustomer: {screen: containers.ChooseCustomer },
  },
  navigationOptions
);

export const DrawerNav = DrawerNavigator(
  {
    Splash: { screen: containers.Splash },
    Login: { screen: containers.Login },
    Register: { screen: containers.Register },
    RegisterAMC: { screen: containers.RegisterAMC },
    PublicNav: { screen: PublicNav },
    AppNav: { screen: AppNav },
  },
  {
    contentComponent: (props) => <DrawerContent {...props} />,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);

export const RootNav = StackNavigator(
  {
    DrawerNav: { screen: DrawerNav },
    Login: { screen: containers.Login },
    Register: { screen: containers.Register },
    RegisterAMC: { screen: containers.RegisterAMC },
    RegisterUser: { screen: containers.RegisterUser },
    RecoverAccount: { screen: containers.RecoverAccount },
    ResetPassword: {
      screen: containers.ResetPassword,
      path: `${HOST}/reset-password/:token`,
    },
    Terms: { screen: containers.Terms },
  },
  {
    headerMode: "none",
  }
);

const appDefaultGetStateForAction = AppNav.router.getStateForAction;
const publicDefaultGetStateForAction = PublicNav.router.getStateForAction;

AppNav.router.getStateForAction = (action, state) => {
  if (state && action.type === "Navigation/BACK") {
    if (state.routes[state.index].routeName === "BarcodeCamera") {
      const routes = state.routes.filter(
        (r) => r.routeName !== "BarcodeCamera"
      );

      const index = routes.length - 1;

      return {
        ...state,
        routes,
        index,
      };
    } else if (state.routes[state.index].routeName === "Home") {
      return;
    } else if (state.routes[state.index].routeName === "NewSale") {
      let navigateBack = true;

      if (action.payload && action.payload.forceBack) {
        navigateBack = false;
      }

      if (navigateBack) {
        Alert.alert(
          "Atenção",
          "Você não salvou sua venda, deseja realmente voltar?",
          [
            {
              text: "Cancelar",
              onPress: () => {
                return;
              },
              style: "cancel",
            },
            {
              text: "Sim",
              onPress: () => {
                store.dispatch({
                  type: "Navigation/BACK",
                  payload: {
                    forceBack: true,
                  },
                });
              },
            },
          ],
          { cancelable: false }
        );

        return;
      }
    }
  } else if (state && action.type.startsWith("Navigation/")) {
    const { type, routeName } = action;
    const lastRoute = state.routes[state.routes.length - 1];

    if (routeName !== "ContentDetail" && routeName == lastRoute.routeName) {
      return;
    }
  }

  return appDefaultGetStateForAction(action, state);
};

PublicNav.router.getStateForAction = (action, state) => {
  if (state && action.type === "Navigation/BACK") {
    if (state.routes[state.index].routeName === "HomePublic") {
      return;
    }
  } else if (state && action.type.startsWith("Navigation/")) {
    const { type, routeName } = action;
    const lastRoute = state.routes[state.routes.length - 1];

    if (routeName !== "ContentDetail" && routeName == lastRoute.routeName) {
      return;
    }
  }

  return publicDefaultGetStateForAction(action, state);
};
