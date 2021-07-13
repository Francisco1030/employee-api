const { CreateEmployeeUseCase, DynamoDbEmployeeRepository, CreateEmployeeController } = require('./import');


module.exports = class CreateEmployeeRouterComposer {
  static compose() {
    const createEmployeeUseCase = new CreateEmployeeUseCase({
      employeeRepository: new DynamoDbEmployeeRepository()
    });

    return new CreateEmployeeController(createEmployeeUseCase);
  }
};
