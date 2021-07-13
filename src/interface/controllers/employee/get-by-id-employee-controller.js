const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class GetByIdEmployeeController {
  constructor(getByIdEmployeeUseCase) {
    this.getByIdEmployeeUseCase = getByIdEmployeeUseCase;
  }

  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const employeeRecovered = await this.getByIdEmployeeUseCase.handle({ id });

      return HttpResponse.ok({ ...employeeRecovered });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
