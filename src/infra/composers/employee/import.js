module.exports = {
  CreateEmployeeUseCase: require('../../../app/use-case/employee/create/create-employee'),
  GetByIdEmployeeUseCase: require('../../../app/use-case/employee/get-by-id/get-by-id-employee'),
  GetAllEmployeesUseCase: require('../../../app/use-case/employee/get-all/get-all-employee'),
  UpdateEmployeeUseCase: require('../../../app/use-case/employee/update/update-employee'),
  DeleteEmployeeUseCase: require('../../../app/use-case/employee/delete/delete-employee'),
  CreateEmployeeController: require('../../../interface/controllers/employee/create-employee-controller'),
  GetByIdEmployeeController: require('../../../interface/controllers/employee/get-by-id-employee-controller'),
  GetAllEmployeesController: require('../../../interface/controllers/employee/get-all-employees-controller'),
  UpdateEmployeeController: require('../../../interface/controllers/employee/update-employee-controller'),
  DeleteEmployeeController: require('../../../interface/controllers/employee/delete-employee-controller'),
  DynamoDbEmployeeRepository: require('../../repositories/dynamodb/dynamodb-employee-repository')
};