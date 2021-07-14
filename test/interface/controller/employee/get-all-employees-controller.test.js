const GetAllEmployeesUseCase = require('../../../../src/app/use-case/employee/get-all/get-all-employee');
const GetAllEmployeesController = require('../../../../src/interface/controllers/employee/get-all-employees-controller');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeeSpyData = () => ({
  id: 'any-id',
  age: 'any-age',
  name: 'any-name',
  office: 'any-office'
});

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();
  const employee = makeEmployeeSpyData();

  const getAllEmployeesUseCase = new GetAllEmployeesUseCase({
    employeeRepository: employeeRepositorySpy
  });

  const sut = new GetAllEmployeesController(getAllEmployeesUseCase);

  return {
    sut,
    employee,
    employeeRepositorySpy,
    getAllEmployeesUseCase
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employee) => {
  const mockReturn = [{ ...employee }, { ...employee }];
  employeeRepositorySpy.fetchAll.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: getAll employees", () => {

  test("Should return employees", async () => {
    const { sut, employee, employeeRepositorySpy } = makeSut();
    const expected = mockReturnEmployeeRepository(employeeRepositorySpy, employee);

    const { body, statusCode } = await sut.handle();

    expect(body).toEqual(expected);
    expect(statusCode).toBe(200);
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

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    const response = await sut.handle();
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });
});
