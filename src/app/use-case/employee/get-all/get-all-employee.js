const OutputBoundary = require('./output-boundary');

module.exports = class GetAllEmployeesUseCase {
  constructor({ employeeRepository } = {}) {
    this.employeeRepository = employeeRepository;
  }

  async handle() {
    const employeeList = await this.employeeRepository.fetchAll();

    return employeeList.map(employee => new OutputBoundary(employee))
  }
}
