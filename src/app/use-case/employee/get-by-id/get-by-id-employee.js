const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class GetByIdEmployeeUseCase {
  constructor({ employeeRepository } = {}) {
    this.employeeRepository = employeeRepository;
  }

  async handle(input) {
    const { id } = new InputBoundary(input);
    const employeeRecovered = await this.employeeRepository.fetchOne(id);

    return new OutputBoundary(employeeRecovered);
  }
}
