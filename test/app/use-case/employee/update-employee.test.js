const UpdateEmployeeUseCase = require('../../../../src/app/use-case/employee/update/update-employee');
const OutputBoundary = require('../../../../src/app/use-case/employee/update/output-boundary');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeeSpyData = () => ({
  id: 'any-id',
  age: 'any-age',
  name: 'any-name',
  office: 'any-office'
})

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();
  const employee = makeEmployeeSpyData();

  const sut = new UpdateEmployeeUseCase({
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
  employeeRepositorySpy.update.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: update employee", () => {

  test("Should return employee", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    const expected = mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    const employeeUpdated = await sut.handle(employee);

    expect(employeeUpdated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    const employeeUpdated = await sut.handle(employee);

    expect(employeeUpdated).toBeInstanceOf(OutputBoundary);
  });

  test("Should call handle", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);

    await sut.handle(employee);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(employee);
  });

  test("Should call update", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    jest.spyOn(employeeRepositorySpy, 'update');
    await sut.handle(employee);

    expect(employeeRepositorySpy.update).toHaveBeenCalled();
    expect(employeeRepositorySpy.update).toHaveBeenCalledTimes(1);
    expect(employeeRepositorySpy.update).toHaveBeenCalledWith(employee);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new UpdateEmployeeUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
