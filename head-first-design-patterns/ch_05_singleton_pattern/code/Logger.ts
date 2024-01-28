export class Logger {
  private static instance: Logger;
  private enabledLogging: boolean;

  private constructor() {}

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public configure({ enableLogging }) {
    this.enabledLogging = enableLogging;
  }

  public configCheck() {
    console.log(`Is logging enabled?`, this.enabledLogging);
  }
}
