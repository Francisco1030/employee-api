const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class CreateEmployeeController {
  constructor(createEmployeeUseCase) {
    this.createEmployeeUseCase = createEmployeeUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const employeeCreated = await this.createEmployeeUseCase.handle({
        age: data.age,
        name: data.name,
        office: data.office,
      });

      return HttpResponse.created({ ...employeeCreated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
