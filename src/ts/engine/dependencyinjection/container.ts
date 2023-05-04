class Container {
  private static _services: { [key: string]: any } = {};

  public static register<T>(key: string, service: T): void {
    this._services[key] = service;
  }

  public static resolve<T>(key: string): T | undefined {
    return this._services[key];
  }
}

export default Container;
