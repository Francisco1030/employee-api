const router = require("express").Router();
const fg = require("fast-glob");
const HttpResponse = require('../../../interface/helppers/http-response');
const { NotFoundError } = require("../../../shared/utils/errors");

module.exports = (app) => {
  app.use("/api", router);

  fg.sync("**/src/infra/web-server/routes/**routes.js").forEach((file) =>
    require(`../../../../${file}`)(router)
  );

  app.use((request, response, next) => {
    const error = new NotFoundError('Rota não encontrada');
    const httpResponse = HttpResponse.notFoundError(error);
    
    response.status(httpResponse.statusCode).send(httpResponse);
  });
};
