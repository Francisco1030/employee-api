const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class DeleteEmployeeController {
  constructor(deleteEmployeeUseCase) {
    this.deleteEmployeeUseCase = deleteEmployeeUseCase;
  }

  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params;
      await this.deleteEmployeeUseCase.handle({ id });

      return HttpResponse.ok();
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
