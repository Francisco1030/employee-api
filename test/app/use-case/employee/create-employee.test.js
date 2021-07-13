const CreateEmployeeUseCase = require('../../../../src/app/use-case/employee/create/create-employee');
const OutputBoundary = require('../../../../src/app/use-case/employee/create/output-boundary');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeeSpyData = () => ({
  age: 'any-age',
  name: 'any-name',
  office: 'any-office'
})

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();
  const employee = makeEmployeeSpyData();

  const sut = new CreateEmployeeUseCase({
    employeeRepository: employeeRepositorySpy
  });

  return {
    sut,
    employee,
    employeeRepositorySpy
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employee) => {
  const mockReturn = { id: 'any-id', ...employee };
  employeeRepositorySpy.create.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: create employee", () => {

  test("Should return employee", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    const expected = mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    const employeeCreated = await sut.handle(employee);

    expect(employeeCreated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    const taskCreated = await sut.handle(employee);

    expect(taskCreated).toBeInstanceOf(OutputBoundary);
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

  test("Should call create", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);
    jest.spyOn(employeeRepositorySpy, 'create');
    
    await sut.handle(employee);

    expect(employeeRepositorySpy.create).toHaveBeenCalled();
    expect(employeeRepositorySpy.create).toHaveBeenCalledTimes(1);
    expect(employeeRepositorySpy.create).toHaveBeenCalledWith(employee);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'age' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new CreateEmployeeUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'age' of undefined");
  });

});
