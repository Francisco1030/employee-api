const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class UpdateEmployeeUseCase {
  constructor({ employeeRepository } = {}) {
    this.employeeRepository = employeeRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const employeeUpdated = await this.employeeRepository.update(inputBoundary);

    return new OutputBoundary(employeeUpdated);
  }
}
