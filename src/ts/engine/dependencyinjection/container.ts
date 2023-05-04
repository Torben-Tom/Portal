class Container {
  private static _services: { [key: string]: any } = {};

  public static register<T>(key: string, service: T): void {
    if (this._services[key]) {
      console.warn(
        `Service with key ${key} registered multiple times. Overwriting existing service in favor of new one.`
      );
    }
    this._services[key] = service;
  }

  public static resolve<T>(key: string): T | undefined {
    return this._services[key];
  }
}

export default Container;
