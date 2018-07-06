const fs = require('fs');

module.exports = MLog;

function isArrayOrObject(value) {
  const type = {}.toString.call(value);
  return type === '[object Array]' || type === '[object Object]';
}

function MLog(opts) {
  this.options = Object.assign({}, MLog.defaultOptions, opts);
}

MLog.logLevel = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};

MLog.defaultOptions = {
  dir: './logs/', // 日志输出目录
  level: 'debug', // 输出以上日志级别
  createFolderByLevel: false, // 为每个日志级别创建文件夹
  consolePrint: false, // 同步输出到控制台
  format: '{datetime}\t[{level}]\t{message}' // 日志文本格式化
};

Object.keys(MLog.logLevel).forEach(key => {
  MLog.prototype[key] = function(...args) {
    let message = args.map(arg => (isArrayOrObject(arg) ? JSON.stringify(arg) : arg)).join('\t');
    this.write(key, message);
  };
});

MLog.prototype.write = function(lv, message) {
  const { dir, level, createFolderByLevel, consolePrint, format } = this.options;
  // 是否需要输出
  if (MLog.logLevel[lv] >= MLog.logLevel[level]) {
    const now = new Date(),
      filePath = createFolderByLevel ? dir + lv + '/' : dir,
      fileName = now.toLocaleDateString() + '.log',
      createTime = now.toLocaleString();

    // 创建 logs 文件夹
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    // 创建 level 文件夹
    createFolderByLevel && !fs.existsSync(filePath) && fs.mkdirSync(filePath);

    const line = format.replace('{datetime}', createTime).replace('{level}', lv).replace('{message}', message);
    fs.appendFile(filePath + fileName, line + '\n', err => err && console.error(err));
    consolePrint && console.log(line);
  }
};
