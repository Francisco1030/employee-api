const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class UpdateEmployeeController {
  constructor(updateEmployeeUseCase) {
    this.updateEmployeeUseCase = updateEmployeeUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const employeeUpdated = await this.updateEmployeeUseCase.handle({
        id: data.id,
        age: data.age,
        name: data.name,
        office: data.office,
      });

      return HttpResponse.ok({ ...employeeUpdated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
