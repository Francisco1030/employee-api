const InputBoundary = require('./input-boundary');

module.exports = class DeleteEmployeeUseCase {
  constructor({ employeeRepository } = {}) {
    this.employeeRepository = employeeRepository;
  }

  async handle(input) {
    const { id } = new InputBoundary(input);
    return await this.employeeRepository.delete(id);
  }
}
