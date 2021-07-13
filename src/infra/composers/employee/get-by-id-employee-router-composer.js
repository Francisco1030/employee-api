const { GetByIdEmployeeUseCase, DynamoDbEmployeeRepository, GetByIdEmployeeController } = require('./import');

module.exports = class GetByIdEmployeeRouterComposer {
  static compose() {
    const getByIdEmployeeUseCase = new GetByIdEmployeeUseCase({
      employeeRepository: new DynamoDbEmployeeRepository()
    });

    return new GetByIdEmployeeController(getByIdEmployeeUseCase);
  }
};
