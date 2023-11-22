export abstract class ModuleStore {
  abstract readonly STORAGE_MODULE_KEY: string;
  abstract isActive: boolean;
  abstract isAvailable: boolean;
  abstract toggleModuleActive(): void;
  abstract subscribeToChanges(): void;
  abstract init(): void;
}
