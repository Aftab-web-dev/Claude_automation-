const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m'
};

function colorize(text, color) {
  return `${COLORS[color] || ''}${text}${COLORS.reset}`;
}

function log(message, color = 'reset') {
  console.log(colorize(message, color));
}

function success(message) { log(`✅ ${message}`, 'green'); }
function warn(message) { log(`⚠️  ${message}`, 'yellow'); }
function error(message) { log(`❌ ${message}`, 'red'); }
function info(message) { log(`ℹ️  ${message}`, 'blue'); }
function heading(message) { log(`\n${message}`, 'bright'); }

function box(title, color = 'cyan') {
  const line = '═'.repeat(58);
  log(`\n╔${line}╗`, color);
  log(`║     ${title.padEnd(53)}║`, color);
  log(`╚${line}╝\n`, color);
}

function table(headers, rows) {
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => String(r[i] || '').length))
  );
  const separator = colWidths.map(w => '─'.repeat(w + 2)).join('┼');

  const formatRow = (row) => row.map((cell, i) =>
    ` ${String(cell).padEnd(colWidths[i])} `
  ).join('│');

  log('┌' + colWidths.map(w => '─'.repeat(w + 2)).join('┬') + '┐', 'dim');
  log('│' + formatRow(headers) + '│', 'bright');
  log('├' + separator + '┤', 'dim');
  rows.forEach(row => log('│' + formatRow(row) + '│'));
  log('└' + colWidths.map(w => '─'.repeat(w + 2)).join('┴') + '┘', 'dim');
}

module.exports = { COLORS, colorize, log, success, warn, error, info, heading, box, table };
