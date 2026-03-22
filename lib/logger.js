const fs = require('fs');

class Logger {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.logFile = options.logFile || null;
    this.silent = options.silent || false;
  }

  _write(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;

    if (this.logFile) {
      fs.appendFileSync(this.logFile, logEntry + '\n');
    }

    if (!this.silent && (this.verbose || level !== 'DEBUG')) {
      if (level === 'ERROR') console.error(logEntry);
      else if (level === 'WARN') console.warn(logEntry);
    }
  }

  debug(message) { this._write('DEBUG', message); }
  info(message) { this._write('INFO', message); }
  warn(message) { this._write('WARN', message); }
  error(message) { this._write('ERROR', message); }
}

let instance = null;

function getLogger(options) {
  if (!instance || options) {
    instance = new Logger(options);
  }
  return instance;
}

module.exports = { Logger, getLogger };
