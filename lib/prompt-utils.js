const readline = require('readline');
const { log, colorize } = require('./colors');

function confirm(message, options = {}) {
  if (options.testInput !== undefined) {
    const input = options.testInput.trim().toLowerCase();
    return Promise.resolve(input !== 'n');
  }

  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`  ${message} (Y/n): `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() !== 'n');
    });
  });
}

function select(message, options, opts = {}) {
  if (opts.testInput !== undefined) {
    const index = parseInt(opts.testInput, 10) - 1;
    if (index >= 0 && index < options.length) {
      return Promise.resolve(options[index].id);
    }
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    log(`\n  ${message}\n`);

    const categories = {};
    options.forEach((opt) => {
      const cat = opt.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(opt);
    });

    let index = 1;
    const indexMap = {};
    for (const [category, items] of Object.entries(categories)) {
      log(`  ${colorize(category + ':', 'bright')}`);
      const row = [];
      items.forEach((item) => {
        indexMap[index] = item.id;
        row.push(`    ${colorize(String(index) + '.', 'cyan')} ${item.name}`);
        index++;
      });
      for (let i = 0; i < row.length; i += 3) {
        log(row.slice(i, i + 3).map(r => r.padEnd(28)).join(''));
      }
      log('');
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('  Enter number: ', (answer) => {
      rl.close();
      const num = parseInt(answer.trim(), 10);
      resolve(indexMap[num] || null);
    });
  });
}

module.exports = { confirm, select };
