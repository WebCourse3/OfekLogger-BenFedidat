import {LogLevel} from './LogLevel';
import {LogConfiguration} from './LogConfiguration';
import {MessagePrinterBuilder} from './MessagePrinterBuilder';
import {MessagePrinter} from './MessagePrinter';

export class Logger {
    messagePrinter: MessagePrinter;

    constructor(name: string, configuration: LogConfiguration) {
        var builder = new MessagePrinterBuilder();
        if(configuration.console) {
            builder = builder.toConsole();
        }
        if(configuration.file) {
            builder = builder.toFile();
        }
        if(configuration.colors) {
            builder = builder.withColor();
        }
        builder = builder.defaultLogLevel(configuration.logLevel);
        this.messagePrinter = builder.build();
    }

    public log(level: LogLevel, ...strings: string[]): void {
        strings.forEach(string => this.messagePrinter.print(string, level));
    }

    public info(...strings: string[]) {
        this.log(LogLevel.Info, ...strings);
    }

    public warning(...strings: string[]) {
        this.log(LogLevel.Warning, ...strings);
    }

    public debug(...strings: string[]) {
        this.log(LogLevel.Debug, ...strings);
    }

    public error(...strings: string[]) {
        this.log(LogLevel.Error, ...strings);
    }
}