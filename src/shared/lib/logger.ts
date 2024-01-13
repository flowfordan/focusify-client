type LogCategory = 'component' | 'api' | 'router' | 'misc' | 'session';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Extra = Record<string, any>;

/**
 * A simple logger that can be used to log information, warnings, and errors.
 * This logger will only log debug messages in non-prod environments.
 * To enable debug logging in prod, set the `debugLoggingEnabled` property to true.
 */
class Logger {
  debugLoggingEnabled: boolean;
  constructor(private isProd: boolean) {
    this.debugLoggingEnabled = false;
  }
  /**
   * Log information
   *
   * @param category A log message category that will be prepended
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */
  info(category: LogCategory = 'misc', message: string, extra?: Extra) {
    console.info(`[${category}] ${message}`, extra);
  }

  /**
   * Debug information
   *
   * @param category A log message category that will be prepended
   * @param extra Arbitrary data to be logged
   */
  debug(category: LogCategory = 'misc', message: string, extra?: Extra) {
    if (!this.isProd || this.debugLoggingEnabled) {
      console.debug(`[${category}] ${message}`, extra);
    }
  }

  /**
   * Log a warning
   *
   * @param message A warning message
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */
  warn(message: string, extra?: Extra) {
    console.warn(message, extra);
  }

  /**
   * Report a runtime error
   *
   * @param message A description of the error
   * @param error The error that occurred
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */
  error(message: string, error: Error, extra?: Extra) {
    console.error(message, {
      error,
      extra,
    });
  }
}

const isProd = process.env.NEXT_PUBLIC_CUSTOM_ENV === 'prod';
export const LOGGER = new Logger(isProd);
