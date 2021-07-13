const DeleteEmployeeUseCase = require('../../../../src/app/use-case/employee/delete/delete-employee');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeeSpyData = () => ({
  id: 'any-id',
})

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();
  const employee = makeEmployeeSpyData();

  const sut = new DeleteEmployeeUseCase({
    employeeRepository: employeeRepositorySpy
  });

  return {
    sut,
    employee,
    employeeRepositorySpy
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employee) => {
  const mockReturn = { ...employee };
  employeeRepositorySpy.delete.mockReturnValue(mockReturn);
  return mockReturn;
}


describe("use-case: delete employee", () => {

  test("Should call handle", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);

    await sut.handle(employee);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(employee);
  });

  test("Should call delete", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    jest.spyOn(employeeRepositorySpy, 'delete');
    await sut.handle({ ... employee});

    expect(employeeRepositorySpy.delete).toHaveBeenCalled();
    expect(employeeRepositorySpy.delete).toHaveBeenCalledTimes(1);
    expect(employeeRepositorySpy.delete).toHaveBeenCalledWith(employee.id);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new DeleteEmployeeUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
