const CreateEmployeeUseCase = require('../../../../src/app/use-case/employee/create/create-employee');
const CreateEmployeeController = require('../../../../src/interface/controllers/employee/create-employee-controller');
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
  const httpRequest = makeHttpRequest({ body: employee });

  const createEmployeeUseCase = new CreateEmployeeUseCase({
    employeeRepository: employeeRepositorySpy
  });

  const sut = new CreateEmployeeController(createEmployeeUseCase);

  return {
    sut,
    employee,
    httpRequest,
    employeeRepositorySpy,
    createEmployeeUseCase
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employee) => {
  const mockReturn = { ...employee };
  employeeRepositorySpy.create.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: create employee", () => {

  test("Should return employee", async () => {
    const { sut, employee, httpRequest, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);

    const { body, statusCode } = await sut.handle(httpRequest);

    expect(body).toEqual(employee);
    expect(statusCode).toBe(201);
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
    const sut = new CreateEmployeeController();

    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });

});
