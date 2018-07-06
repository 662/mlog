const MLog = require('./mlog');

const log = new MLog();
log.debug('debug');
log.info('info');
log.warn('warn');
log.error('error');
log.fatal('fatal');

log.error({ dx: 1, dxf: { s: { fd: { dfsfs: { a: 1 } } } } }, '第三方的', Date.now(), new Error('fdsfdsfds'));

log.error('错误的配置', { a: 1 });
