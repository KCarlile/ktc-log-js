const Log = require('./log.mjs');

describe('Log', () => {
    let log;
    let logSpy;

    beforeEach(() => {
        log = new Log();
    });

    // test Log.logSingleLine()
    test('should log a single line to console', () => {
        logSpy = jest.spyOn(console, 'log');
        log.logSingleLine();
        expect(logSpy).toHaveBeenCalledWith(Log.LineSingle);
    });

    // test Log.logDoubleLine()
    test('should log a double line to console', () => {
        logSpy = jest.spyOn(console, 'log');
        log.logDoubleLine();
        expect(logSpy).toHaveBeenCalledWith(Log.LineDouble);
    });

    // test Log.clearLogs()
    test('should clear the console', () => {
        logSpy = jest.spyOn(console, 'clear');
        log.clearLogs();
        expect(logSpy).toHaveBeenCalledWith();
    });

    // test Log.log()
    test('should log a message to console', () => {
        const testMessage = 'Test message';
        logSpy = jest.spyOn(console, 'log');
        log.log(testMessage);
        expect(logSpy).toHaveBeenCalledWith(testMessage);
    });

    // test Log.LogConsole (Log)
    test('should log a message of type Log to console', () => {
        const testMessage = 'Test message';
        const logType = Log.LogTypes.Log;
        logSpy = jest.spyOn(console, logType.toLowerCase());
        log.logConsole(testMessage, logType);
        expect(logSpy).toHaveBeenCalledWith(testMessage);
    });

    // test Log.LogConsole (Info)
    test('should log a message of type Info to console', () => {
        const testMessage = 'Test message';
        const logType = Log.LogTypes.Info;
        logSpy = jest.spyOn(console, logType.toLowerCase());
        log.logConsole(testMessage, logType);
        expect(logSpy).toHaveBeenCalledWith(testMessage);
    });

    // test Log.LogConsole (Debug)
    test('should log a message of type Debug to console', () => {
        const testMessage = 'Test message';
        const logType = Log.LogTypes.Debug;
        logSpy = jest.spyOn(console, logType.toLowerCase());
        log.logConsole(testMessage, logType);
        expect(logSpy).toHaveBeenCalledWith(testMessage);
    });

    // test Log.LogConsole (Warn)
    test('should log a message of type Warn to console', () => {
        const testMessage = 'Test message';
        const logType = Log.LogTypes.Warn;
        logSpy = jest.spyOn(console, logType.toLowerCase());
        log.logConsole(testMessage, logType);
        expect(logSpy).toHaveBeenCalledWith(testMessage);
    });

    // test Log.LogConsole (Error)
    test('should log a message of type Info to console', () => {
        const testMessage = 'Test message';
        const logType = Log.LogTypes.Error;
        logSpy = jest.spyOn(console, logType.toLowerCase());
        log.logConsole(testMessage, logType);
        expect(logSpy).toHaveBeenCalledWith(testMessage);
    });
});
