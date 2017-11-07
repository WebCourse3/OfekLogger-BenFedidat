import * as fs from 'fs';

export enum LogLevel {
    Info = "INFO",
    Debug = "DEBUG",
    Warning = "WARNING",
    Error = "ERROR"
}

export class LogConfigration {
    console: boolean;
    file: boolean;
    colors: boolean;
    logLevel: LogLevel;

    constructor(console: boolean, file: boolean, colors: boolean, logLevel: LogLevel) {
        this.console = console;
        this.file = file;
        this.colors = colors;
        this.logLevel = logLevel;
    }
}

export class Logger {
    configuration: LogConfigration;

    constructor(name: string, configuration: LogConfigration) {
        this.configuration = configuration;
    }

    public log(level: LogLevel, ...strings: string[]): void {
        if(!level) {
            level = this.configuration.logLevel
        }
        strings.forEach(string => this.print(string, level));
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

    private print(message: string, level: LogLevel) {
        message = level + " " + message;
        if(this.configuration.file) {
            fs.appendFile("./log.txt", message + "\n", function(err) {
                if(err) {
                    return console.log("Error writing to file: " + err);
                }
            }); 
        }
        if(this.configuration.console) {
            if(this.configuration.colors) {
                message = Logger.colorize(message, level);
            }
            console.log(message);
        }
    }

    private static colorize(message: string, level: LogLevel) {
        switch(level) {
            case LogLevel.Info:
                return `\x1b[34m${message}\x1b[0m`;
            case LogLevel.Warning:
                return `\x1b[33m${message}\x1b[0m`;
            case LogLevel.Debug:
                return `\x1b[32m${message}\x1b[0m`;
            case LogLevel.Error:
                return `\x1b[31m${message}\x1b[0m`;
            default:
                return message;
        }
    }
}