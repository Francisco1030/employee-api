const { UpdateEmployeeUseCase, DynamoDbEmployeeRepository, UpdateEmployeeController } = require('./import');

module.exports = class UpdateEmployeeRouterComposer {
  static compose() {
    const updateEmployeeUseCase = new UpdateEmployeeUseCase({
      employeeRepository: new DynamoDbEmployeeRepository()
    });

    return new UpdateEmployeeController(updateEmployeeUseCase);
  }
};
