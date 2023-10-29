export abstract class ModuleStore {
  abstract isActive: boolean;
  abstract isAvailable: boolean;
  abstract toggleModuleActive(): void;
  abstract subscribeToChanges(): void;
  abstract init(): void;
}
