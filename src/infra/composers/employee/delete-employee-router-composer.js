const { DeleteEmployeeUseCase, DynamoDbEmployeeRepository, DeleteEmployeeController } = require('./import');

module.exports = class DeleteEmployeeRepositoryRouterComposer {
  static compose() {
    const deleteEmployeeUseCase = new DeleteEmployeeUseCase({
      employeeRepository: new DynamoDbEmployeeRepository()
    });

    return new DeleteEmployeeController(deleteEmployeeUseCase);
  }
};
