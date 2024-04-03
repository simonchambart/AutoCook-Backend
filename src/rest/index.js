const Router = require('@koa/router');


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app
 */
module.exports = (app) => {
    const router = new Router({
        prefix: '/api',
    });

    app.use(router.routes()).use(router.allowedMethods());
};