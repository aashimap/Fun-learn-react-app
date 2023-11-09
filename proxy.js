const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/google",
    createProxyMiddleware({
      target: "https://accounts.google.com",
      changeOrigin: true,
      pathRewrite: {
        "^/auth/google": "/o/oauth2/v2/auth",
      },
    })
  );
};
