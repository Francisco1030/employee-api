const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class CreateEmployeeUseCase {
  constructor({ employeeRepository } = {}) {
    this.employeeRepository = employeeRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const employeeCreated = await this.employeeRepository.create(inputBoundary);

    return new OutputBoundary(employeeCreated);
  }
}
