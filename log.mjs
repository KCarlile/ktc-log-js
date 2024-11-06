/**
 * @file Log module.
 * @module js/lib/log.mjs
 *
 * @author Kenny Carlile
 * @link https://www.kcarlile.com/
 * @link https://github.com/KCarlile
 */

/**
 * Class representing configurable logging functionality.
 */
module.exports = class Log {
    // ========== BEGIN private members
    #textareaId;
    #consoleLoggingEnabled;
    #textareaLoggingEnabled;
    // ========== END private members

    // ========== BEGIN public static members
    /**
     * Enumeration for Log Types.
     * @readonly
     * @enum {string}
     */
    static LogTypes = {
        Log: 'Log',
        Info: 'Info',
        Debug: 'Debug',
        Warn: 'Warn',
        Error: 'Error',
    }; // end LogTypes enumeration

    static LineSingle = '------------------------------------------------------------';
    static LineDouble = '============================================================';
    // ========== END public static members

    // ========== BEGIN constructors
    /**
     * Create a Log object instance.
     * @param {string} paramTextareaId - The id of a textarea HTML element in which to write log messages.
     * @param {boolean} paramConsoleLoggingEnabled - A boolean determining if console logging should be enabled.
     * @param {boolean} paramTextareaLoggingEnabled - A boolean determining if textarea logging should be enabled.
     */
    constructor(paramTextareaId = '',
        paramConsoleLoggingEnabled = true,
        paramTextareaLoggingEnabled = true) {
        this.#textareaId = paramTextareaId;
        this.#consoleLoggingEnabled = paramConsoleLoggingEnabled;
        this.#textareaLoggingEnabled = paramTextareaLoggingEnabled;
    } // end default constructor
    // ========== END constructors

    // ========== BEGIN properties
    /**
     * Gets the enabled status for console logging.
     * @return {boolean} The enabled status of console logging.
     */
    get consoleLoggingEnabled() {
        return this.#consoleLoggingEnabled;
    } // end get consoleLoggingEnabled property

    /**
     * Sets the enabled status for console logging.
     * @param {boolean} paramConsoleLoggingEnabled - The enabled status of console logging.
     */
    set consoleLoggingEnabled(paramConsoleLoggingEnabled) {
        this.#consoleLoggingEnabled = paramConsoleLoggingEnabled;
    } // end set consoleLoggingEnabled property

    /**
     * Gets the enabled status for textarea logging.
     * @return {boolean} The enabled status of console logging.
     */
    get textareaLoggingEnabled() {
        return this.#textareaLoggingEnabled;
    } // end get textareaLoggingEnabled property

    /**
     * Sets the enabled status for textarea logging.
     * @param {boolean} paramTextareaLoggingEnabled - The enabled status of textarea logging.
     */
    set textareaLoggingEnabled(paramTextareaLoggingEnabled) {
        this.#textareaLoggingEnabled = paramTextareaLoggingEnabled;
    } // end set textareaLoggingEnabled property

    /**
     * Gets the id of the textarea HTML element used for logging.
     * @return {string} The id of the textarea element used for logging.
     */
    get textareaId() {
        return this.#textareaId;
    } // end get textareaId property

    /**
     * Sets the id of the textarea HTML element used for logging.
     * @param {string} paramTextareaId - The id of the textarea element used for logging.
     */
    set textareaId(paramTextareaId) {
        this.#textareaId = paramTextareaId;
    } // end set textareaId property
    // ========== END properties

    // ========== BEGIN private methods
    /**
     * Private method that gets the textarea element by id.
     * @return {object} The element found by the id.
     */
    #getTextareaElement() {
        let element = null;

        if (this.#textareaId != '') {
            element = document.getElementById(this.#textareaId);
        } // end if test

        return element;
    } // end #getTextareaElement method
    // ========== END private methods

    // ========== BEGIN public methods
    /**
     * Appends a log message of a certain log type to the specified HTML textarea element.
     * @param {string} paramMessage - The message to log.
     * @param {LogTypes} paramLogType - The type of message to log.
     */
    logTextarea(paramMessage, paramLogType = null) {
        try {
            const element = this.#getTextareaElement();
            let logTypePrefix = '';

            if (!element) {
                throw new Error('Textarea not found or not specified.');
            } // end if test

            switch (paramLogType) {
                case Log.LogTypes.Log:
                    logTypePrefix = '[Log] ';
                    break;
                case Log.LogTypes.Info:
                    logTypePrefix = '[Info] ';
                    break;
                case Log.LogTypes.Debug:
                    logTypePrefix = '[Debug] ';
                    break;
                case Log.LogTypes.Warn:
                    logTypePrefix = '[Warn] ';
                    break;
                case Log.LogTypes.Error:
                    logTypePrefix = '[Error] ';
                    break;
                case null:
                default:
                    logTypePrefix = '[Log] ';
            } // end switch case

            element.value += logTypePrefix + paramMessage + `\n`;
        } // end try
        catch (e) {
            this.logConsole(e.name, Log.LogTypes.Error);
        } // end catch
    } // end logTextarea method

    /**
     * Appends a log message of a certain log type to the browser's console.
     * @param {string} paramMessage - The message to log.
     * @param {LogTypes} paramLogType - The type of message to log.
     */
    logConsole(paramMessage, paramLogType = null) {
        switch (paramLogType) {
            case Log.LogTypes.Log:
                console.log(paramMessage);
                break;
            case Log.LogTypes.Info:
                console.info(paramMessage);
                break;
            case Log.LogTypes.Debug:
                console.debug(paramMessage);
                break;
            case Log.LogTypes.Warn:
                console.warn(paramMessage);
                break;
            case Log.LogTypes.Error:
                console.error(paramMessage);
                break;
            case null:
            default:
                console.log(paramMessage);
        } // end switch case
    } // end logConsole method

    /**
     * Appends a log message of a specified log type to enabled logging methods.
     * @param {string} paramMessage - The message to log.
     * @param {LogTypes} paramLogType - The type of message to log.
     */
    log(paramMessage, paramLogType = null) {
        let boolLogToConsole = false;

        if ((this.#textareaLoggingEnabled === true)) {
            if (this.#textareaId == '') {
                boolLogToConsole = true;
            } // end if test
            else {
                this.logTextarea(paramMessage, paramLogType);
            } // end else test
        } // end if test

        if ((this.#consoleLoggingEnabled === true) || (boolLogToConsole)) {
            this.logConsole(paramMessage, paramLogType);
        } // end if test
    } // end log method

    /**
     * Appends a single line (see const lineSingle) to enabled logging methods for dividing up logs.
     */
    logSingleLine() {
        this.log(Log.LineSingle);
    } // end logSingleLine method

    /**
     * Appends a double line (see const lineDouble) to enabled logging methods for dividing up logs.
     */
    logDoubleLine() {
        this.log(Log.LineDouble);
    } // end logDoubleLine method

    /**
     * Clears the contents of all logging mechanisms.
     */
    clearLogs() {
        if (this.#getTextareaElement() != null) {
            this.#getTextareaElement().value = '';
        } // end if test

        console.clear();
    } // end clearLogs method

    /**
     * Appends a textarea element for logging to the end of the HTML element of the page.
     * @param {string} paramTextareaId - The id for the textarea.
     * @param {number} paramRows - The number of rows in the textarea; defaults to 20.
     * @param {number} paramCols - The number of columns in the textarea; defaults to 80.
     * @param {string} paramAttributes - Any additional attributes.
     */
    appendTextareaElement(paramTextareaId = 'textlog',
        paramRows = 20,
        paramCols = 80,
        paramAttributes = '') {
        this.textareaId = paramTextareaId;

        const textareaElement = '<textarea id="' + paramTextareaId +
            '" rows="' + paramRows +
            '" cols="' + paramCols +
            '" ' + paramAttributes + ' ></textarea>';

        document.querySelector('html').innerHTML += textareaElement;
    } // end appendTextareaElement method

    /**
     * Tests the various logging methods.
     */
    testLogging() {
        this.consoleLoggingEnabled = true;
        this.textareaLoggingEnabled = true;
        this.clearLogs();
        this.logDoubleLine();
        this.consoleLoggingEnabled = false;
        this.log('Generic message to textarea');
        this.textareaLoggingEnabled = false;
        this.consoleLoggingEnabled = true;
        this.log('Generic message to console');
        this.consoleLoggingEnabled = true;
        this.textareaLoggingEnabled = true;
        this.logSingleLine();
        this.log('Generic message to textarea and console');
        this.log('Log message to textarea and console', Log.LogTypes.Info);
        this.log('Info message to textarea and console', Log.LogTypes.Info);
        this.log('Debug message to textarea and console', Log.LogTypes.Debug);
        this.log('Warn message to textarea and console', Log.LogTypes.Warn);
        this.log('Error message to textarea and console', Log.LogTypes.Error);
        this.log('Null type message to textarea and console', null);
        this.logDoubleLine();
    } // end testLogging method
    // ========== END public methods
} // end Log class
