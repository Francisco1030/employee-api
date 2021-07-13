const { GetAllEmployeesUseCase, DynamoDbEmployeeRepository, GetAllEmployeesController } = require('./import');

module.exports = class GetAllEmployeesListRouterComposer {
  static compose() {
    const getAllEmployeesUseCase = new GetAllEmployeesUseCase({ 
      employeeRepository: new DynamoDbEmployeeRepository()
    });

    return new GetAllEmployeesController(getAllEmployeesUseCase);
  }
};
