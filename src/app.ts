import {LogLevel, LogConfigration, Logger} from "./logger";

let loggerConfig: LogConfigration, logger: Logger;

loggerConfig = new LogConfigration(true, true, true, LogLevel.Warning);
logger = new Logger("appLogger", loggerConfig);
logger.log(LogLevel.Error, 'ColorError');
logger.log(LogLevel.Info, 'ColorInfo');
logger.log('Colordefault');

loggerConfig = new LogConfigration(true, false, false, LogLevel.Warning);
logger = new Logger("appLogger", loggerConfig);
logger.log(LogLevel.Error, 'Error');
logger.log(LogLevel.Info, 'Info');