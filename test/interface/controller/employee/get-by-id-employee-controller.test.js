const GetByIdEmployeeUseCase = require('../../../../src/app/use-case/employee/get-by-id/get-by-id-employee');
const GetByIdEmployeeController = require('../../../../src/interface/controllers/employee/get-by-id-employee-controller');
const { NotFoundError } = require('../../../../src/shared/utils/errors');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeeSpyData = () => ({
  id: 'any-id',
  age: 'any-age',
  name: 'any-name',
  office: 'any-office'
});

const makeHttpRequest = ({ body, params }) => ({
  body,
  params
});

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();
  const employee = makeEmployeeSpyData();
  const httpRequest = makeHttpRequest({ params: employee.id });

  const getByIdEmployeeUseCase = new GetByIdEmployeeUseCase({
    employeeRepository: employeeRepositorySpy
  });

  const sut = new GetByIdEmployeeController(getByIdEmployeeUseCase);

  return {
    sut,
    employee,
    httpRequest,
    employeeRepositorySpy,
    getByIdEmployeeUseCase
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employee) => {
  const mockReturn = { ...employee };
  employeeRepositorySpy.fetchOne.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: get by id employee", () => {

  test("Should return employee", async () => {
    const { sut, employee, httpRequest, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);

    const { body, statusCode } = await sut.handle(httpRequest);

    expect(body).toEqual(employee);
    expect(statusCode).toBe(200);
  });

  test("Should return NotFound", async () => {
    const { sut, httpRequest, employeeRepositorySpy } = makeSut();
    employeeRepositorySpy.fetchOne.mockImplementation(() => {
      throw new NotFoundError(`Employee not found!`);
    });

    const { body, statusCode } = await sut.handle(httpRequest);

    expect(body).toEqual({
      error: "NotFoundError",
      message: "Employee not found!",
    });
    expect(statusCode).toBe(404);
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

  test("Should instantiate a controller without a useCase", async () => {
    const { httpRequest } = makeSut();
    const sut = new GetByIdEmployeeController();

    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });

});
