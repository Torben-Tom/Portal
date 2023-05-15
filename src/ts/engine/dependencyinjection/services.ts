class Services {
  private static _services: Map<string, any> = new Map();

  public static register<T>(service: T, key?: string): void {
    if (!key) {
      if (typeof service === "object") {
        key = (service as Object).constructor.name;
      } else {
        key = typeof service;
      }
    }
    if (this._services.has(key)) {
      console.warn(
        `Service with key ${key} registered multiple times. Overwriting existing service in favor of new one.`
      );
    }
    this._services.set(key, service);
  }

  public static resolve<T>(key: string): T | undefined {
    return this._services.get(key);
  }
}

export default Services;
