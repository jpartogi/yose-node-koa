const router = require('koa-router')();

router.get('/', require('./app/index'));
router.get('/ping', require('./app/ping'));

module.exports = router;