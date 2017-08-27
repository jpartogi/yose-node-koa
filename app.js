const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');

const koaBody = require('koa-body');
const views = require('koa-views');
const static = require('koa-static');
const json = require('koa-json')

const path = require('path');
const nunjucks = require('nunjucks');
const nunjucksEnvironment = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.join(__dirname, './views'))
);

var router = require('./routes');

app.use(logger());
app.use(json());

app.use(views(path.join(__dirname, '/views'), 
  { 
	  map: {
	   html: 'nunjucks' 
	  },
	  options: {
        nunjucksEnv: nunjucksEnvironment
    }
  }
));

app.use(koaBody());

app.use(router.routes());

app.use(static('./public'));

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

module.exports = app;