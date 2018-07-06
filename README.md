# mlog

一个基于nodejs的简易日志模块

## 使用方式

```
    const MLog = require('./mlog');

    // 默认配置
    // const log = new MLog({
    //     dir: './logs/', // 日志输出目录
    //     level: 'debug', // 输出以上日志级别
    //     createFolderByLevel: false, // 为每个日志级别创建文件夹
    //     consolePrint: false, // 同步输出到控制台
    //     format: '{datetime}\t[{level}]\t{message}' // 日志文本格式化
    // });

    const log = new MLog();
    log.debug('debug');
    log.info('info');
    log.warn('warn');
    log.error('error');
    log.fatal('fatal');

    log.error({ dx: 1, dxf: { s: { fd: { dfsfs: { a: 1 } } } } }, 'XXXXXXXX', Date.now(), new Error('ZZZZZZZZZZZ'));

    log.error('错误的配置', { a: 1 });
```

