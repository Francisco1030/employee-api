const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class GetAllEmployeesController {
  constructor(getAllEmployeesUseCase) {
    this.getAllEmployeesUseCase = getAllEmployeesUseCase;
  }

  async handle() {
    try {
      const employeesList = await this.getAllEmployeesUseCase.handle();

      return HttpResponse.ok(employeesList);
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
