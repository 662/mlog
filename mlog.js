'use strict';

const fs = require('fs');

module.exports = MLog;

function MLog(opts) {
  this.Options = Object.assign({}, MLog.defaultOptions, opts);
}
function isArrayOrObject(value) {
  const type = {}.toString.call(value);
  return type === '[object Array]' || type === '[object Object]';
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
  level: 'debug', // 启用以上日志级别
  createFolderByLevel: false, // 为每个日志级别创建文件夹
  consolePrint: false, // 同步输出到控制台
  format: '{datetime}\t[{level}]\t{message}' // 日志文本格式化
};

for (var p in MLog.logLevel) {
  (function(p) {
    MLog.prototype[p] = function(...args) {
      let message = args.map(arg => (isArrayOrObject(arg) ? JSON.stringify(arg) : arg)).join('\t');
      this.write(p, message);
    };
  })(p);
}

MLog.prototype.write = function(level, message) {
  var needWrite = MLog.logLevel[level] >= MLog.logLevel[this.Options.level];
  if (needWrite) {
    var line = this.Options.format,
      filePath = this.Options.createFolderByLevel ? this.Options.dir + level + '/' : this.Options.dir,
      fileName = new Date().toLocaleDateString() + '.log', // 每一天生成一个文件
      createTime = new Date().toLocaleString(),
      consolePrint = this.Options.consolePrint;

    // 创建 logs 文件夹
    !fs.existsSync(this.Options.dir) && fs.mkdirSync(this.Options.dir);
    // 创建 level 文件夹
    this.Options.createFolderByLevel && !fs.existsSync(filePath) && fs.mkdirSync(filePath);

    line = line.replace('{datetime}', createTime);
    line = line.replace('{level}', level);
    line = line.replace('{message}', message);
    fs.appendFile(filePath + fileName, line + '\n', err => err && console.error(err));
    consolePrint && console.log(line);
  }
};
