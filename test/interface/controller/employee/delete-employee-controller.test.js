const DeleteEmployeeUseCase = require('../../../../src/app/use-case/employee/delete/delete-employee');
const DeleteEmployeeController = require('../../../../src/interface/controllers/employee/delete-employee-controller');
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
  const httpRequest = makeHttpRequest({ body: employee, params: employee.id });

  const deleteEmployeeUseCase = new DeleteEmployeeUseCase({
    employeeRepository: employeeRepositorySpy
  });

  const sut = new DeleteEmployeeController(deleteEmployeeUseCase);

  return {
    sut,
    employee,
    httpRequest,
    employeeRepositorySpy,
    deleteEmployeeUseCase
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employee) => {
  const mockReturn = { ...employee };
  employeeRepositorySpy.delete.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: delete employee", () => {

  test("Should return status code 200", async () => {
    const { sut, employee, httpRequest, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employee);

    const { statusCode } = await sut.handle(httpRequest);
    
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

  test("Should instantiate a controller without a useCase", async () => {
    const { httpRequest } = makeSut();
    const sut = new DeleteEmployeeController();

    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });

});
