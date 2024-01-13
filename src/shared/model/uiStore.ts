import { makeAutoObservable } from 'mobx';
import { ModuleId } from 'shared/config';
import { Theme } from 'shared/types';

interface IModuleUIOptions {
  configMenuOpen: boolean;
}

export class UIStore {
  theme: Theme;
  modules: {
    mobileViewCurrentModule: ModuleId | null;
    options: {
      [K in ModuleId]: IModuleUIOptions;
    };
  };
  constructor() {
    this.theme = 'light_default';
    this.modules = {
      mobileViewCurrentModule: null,
      options: {
        tasks: {
          configMenuOpen: false,
        },
        timer: {
          configMenuOpen: false,
        },
        sounds: {
          configMenuOpen: false,
        },
      },
    };
    this._initReactions();
    makeAutoObservable(this);
  }

  isModuleConfigMenuOpen(module: ModuleId) {
    return this.modules.options[module].configMenuOpen;
  }

  setTheme(theme?: Theme) {
    this.theme = theme || 'light_default';
  }

  setMobileCurrentModule(moduleId?: ModuleId) {
    this.modules.mobileViewCurrentModule = moduleId || null;
  }

  setModuleConfigMenuOpen(moduleId: ModuleId, isOpen?: boolean) {
    this.modules.options[moduleId].configMenuOpen = isOpen || false;
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
