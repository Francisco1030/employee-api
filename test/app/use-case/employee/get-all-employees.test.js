const GetAllEmployeesUseCase = require('../../../../src/app/use-case/employee/get-all/get-all-employee');
const OutputBoundary = require('../../../../src/app/use-case/employee/get-all/output-boundary');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeData = () => ([
  {
    id: 'any-id',
    age: 'any-age',
    name: 'any-name',
    office: 'any-office'
  },
  {
    id: 'any-id',
    age: 'any-age',
    name: 'any-name',
    office: 'any-office'
  },
])

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();;
  const employees = makeEmployeData();

  const sut = new GetAllEmployeesUseCase({
    employeeRepository: employeeRepositorySpy
  });

  return {
    sut,
    employees,
    employeeRepositorySpy
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employees) => {
  const mockReturn = [...employees];
  employeeRepositorySpy.fetchAll.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: get all employees", () => {

  test("Should return employees", async () => {
    const { sut, employees, employeeRepositorySpy } = makeSut();
    const expected = mockReturnEmployeeRepository(employeeRepositorySpy, employees);
    const employeeList = await sut.handle();

    expect(employeeList).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, employees, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employees);

    const employeeList = await sut.handle();
    employeeList.forEach(employee => {
      expect(employee).toBeInstanceOf(OutputBoundary);
    });
  });

  test("Should call handle", async () => {
    const { sut, employees, employeeRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnEmployeeRepository(employeeRepositorySpy, employees);

    await sut.handle();

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
  });

  test("Should call fetchAll", async () => {
    const { sut, employees, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employees);
    jest.spyOn(employeeRepositorySpy, 'fetchAll');
    await sut.handle();

    expect(employeeRepositorySpy.fetchAll).toHaveBeenCalled();
    expect(employeeRepositorySpy.fetchAll).toHaveBeenCalledTimes(1);
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new GetAllEmployeesUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'fetchAll' of undefined");
  });

});
