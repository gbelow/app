import color from 'color';
import {Platform} from 'react-native';

import {scale} from '../helpers/scalling';

export default {
  // Components

  get headerBackgroundColor() {
    return this.blackLight;
  },

  get headerTintColor() {
    return this.white;
  },

  get headerLogoWidth() {
    return scale(100);
  },

  get headerLogoHeight() {
    return scale(43);
  },

  get headerIconSize() {
    return scale(18);
  },

  get headerLabelSize() {
    return scale(12);
  },

  get pushBackground() {
    return this.yellow;
  },

  get gridIconSize() {
    return scale(30);
  },

  get menuBackgroundColor() {
    return '#222';
  },

  get menuItemBackgroundColor() {
    return this.blackLight;
  },

  get menuItemBorderRadius() {
    return 10;
  },

  get menuItemIconColor() {
    return this.yellow;
  },

  get menuItemTextColor() {
    return this.white;
  },

  get menuItemBorderWidth() {
    return 0;
  },

  get menuItemBorderColor() {
    return 'rgba(85, 85, 85, 0.8)';
  },

  get menuItemElevation() {
    return 0;
  },

  get avatarNameColor() {
    return this.white;
  },

  get avatarCompanyColor() {
    return this.white;
  },

  get tabsBackgroundColor() {
    return this.blackLighter;
  },

  get navBarBorderBottomWidth() {
    return 0;
  },

  get navBarBorderBottomColor() {
    return this.headerBackgroundColor;
  },

  get showLogoOnNavbar() {
    return true;
  },

  get loginBackgroundColor() {
    return this.blackLight;
  },

  get fbButtonColor() {
    return '#fff';
  },

  get loginLogoWidth() {
    return scale(150);
  },

  get loginLogoHeight() {
    return scale(57);
  },

  get noLoginTextColor() {
    return '#f1f1f1';
  },

  get searchBackgroundContainer() {
    return this.blackLighter;
  },

  // Base colors
  get black() {
    return '#000';
  },
  get blackLight() {
    return '#292828';
  },
  get blackLighter() {
    return '#343232';
  },
  get grey() {
    return '#666';
  },
  get darkGrey() {
    return 'darkgrey';
  },
  get darkenGrey() {
    return '#c4ced8';
  },
  get greyLight() {
    return '#DDD';
  },
  get white() {
    return '#FFF';
  },
  get whiteDarken() {
    return '#F8F8F8';
  },
  get yellow() {
    return '#c4822a';
  },
  get yellowLight() {
    return '#f9c600';
  },
  get orange() {
    return '#ed9819';
  },
  get blue() {
    return '#009CDD';
  },
  get blueDarken() {
    return '#224fb1';
  },
  get blueDark() {
    return '#113C5E';
  },
  get green() {
    return '#34a853';
  },
  get red() {
    return '#D90000';
  },
  get bronze() {
    return '#ed9819';
  },

  get silver() {
    return 'silver';
  },

  get gold() {
    return 'gold';
  },

  get diamond() {
    return 'darkturquoise';
  },

  get superstar() {
    return 'lightseagreen';
  },

  /**
   *
   * Navbar
   *
   */
  get bodyBackgroundColor() {
    return '#F9F9F9';
  },

  /**
   *
   * Gutter
   *
   */
  get gutter() {
    return scale(15);
  },

  /**
   *
   * Base
   *
   */
  get baseBorderRadius() {
    return 4;
  },

  get baseBorderColor() {
    return '#DCDCDC';
  },

  get baseFontSize() {
    return scale(14);
  },

  /**
   *
   * Font size
   *
   */
  get extraSmallFontSize() {
    return scale(10);
  },

  get smallFontSize() {
    return scale(13);
  },

  get mediumFontSize() {
    return scale(16);
  },

  get largeFontSize() {
    return scale(18);
  },

  get bigFontSize() {
    return scale(20);
  },

  get biggerFontSize() {
    return scale(25);
  },

  // Color primary
  get colorPrimary() {
    return this.yellow;
  },
  get hoverColorPrimary() {
    return this.colorPrimary;
    // return color(this.colorPrimary).darken(0.2);
  },

  // Color secondary
  get colorSecondary() {
    return this.colorPrimary;
    // return color(this.colorPrimary).darken(0.2);
  },
  get hoverColorSecondary() {
    return this.colorPrimary;
    // return color(this.colorPrimary).darken(0.2);
  },

  // Text colors
  get textPrimary() {
    return '#333';
  },

  get textSecondary() {
    return '#555';
  },

  /**
   * Status bar
   */
  get statusBarBackground() {
    return '#444';
  },

  get statusBarBackgroundType() {
    return 'dark-content';
  },

  /**
   * Hr
   */
  get listItemBackground() {
    return this.white;
  },

  get listItemShadowColor() {
    return '#999';
  },

  get listItemShadowOffset() {
    return {width: 0, height: 1};
  },

  get listItemShadowOpacity() {
    return 0.5;
  },

  get listItemShadowRadius() {
    return 1;
  },

  /**
   * Divisor
   */
  get divisorBackground() {
    return 'transparent';
  },

  get divisorColor() {
    return '#999';
  },

  get divisorFontSize() {
    return this.baseFontSize;
  },

  get inputBorderColor() {
    return '#444';
  },

  get inputBorderWidth() {
    return 0;
  },

  get inputBorderBottomWidth() {
    return 0;
  },

  get inputBackgrondColor() {
    return this.white;
  },

  get inputTextColor() {
    return this.white;
  },

  get headerAvatarSize() {
    return scale(40);
  },

  /**
   * DRAWER
   */
  get drawerAvatarSize() {
    return scale(90);
  },

  get drawerAvatarbackground() {
    return this.blackLight;
  },

  // No Results
  get noResultsIconFontSize() {
    return scale(38);
  },

  get noResultsTextFontSize() {
    return scale(22);
  },

  get statusBarHeight() {
    return Platform.OS === 'ios' ? 20 : 0;
  },

  // Navigation Bar
  get navigationBarHeight() {
    return 44;
  },

  get dark() {
    return '#333';
  },

  get info() {
    return '#2bbbc2';
  },

  get danger() {
    return '#dd4b39';
  },

  get warning() {
    return '#f2be3c';
  },

  get success() {
    return '#15a092';
  },

  get noStar() {
    return '#dddddd';
  },

  // Toast
  get toastBackgroundColor() {
    return Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.90)' : '#333';
  },

  get toastTextColor() {
    return this.white;
  },

  get toastTextFontSize() {
    return 12;
  },

  get toastBottom() {
    return this.gutter;
  },

  get toastTop() {
    return this.gutter;
  },

  get toastLeft() {
    return this.gutter;
  },

  get toastRight() {
    return this.gutter;
  },

  get toastInnerPadding() {
    return this.gutter;
  },

  get toastBorderRadius() {
    return this.gutter / 2;
  },
};
