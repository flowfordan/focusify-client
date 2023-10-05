import { makeAutoObservable } from 'mobx';
import { Theme } from 'shared/types';

export class UIStore {
  test: number;
  theme: Theme;
  panel: {
    sideblock: 'full' | 'min';
  };
  constructor() {
    this.test = 42;
    this.theme = 'light_default';
    this.panel = {
      sideblock: 'full',
    };
    this._initReactions();
    makeAutoObservable(this);
  }

  setTheme(theme?: Theme) {
    this.theme = theme || 'light_default';
  }

  private _initReactions() {
    // reaction(
    //   () => this.theme,
    //   (curTheme) => {
    //     const theme = curTheme === 'dark' ? 'light' : 'dark';
    //     LOGGER.debug('misc', `change to: ${curTheme}, prev: ${theme}`);
    //     PrimeReact.changeTheme &&
    //       PrimeReact.changeTheme(
    //         `lara-${theme}-blue`,
    //         `lara-${curTheme}-blue`,
    //         'theme-link',
    //         () => {
    //           console.log('theme changed');
    //         },
    //       );
    //   },
    // );
  }
}
