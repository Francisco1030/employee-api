const GetByIdEmployeeUseCase = require('../../../../src/app/use-case/employee/get-by-id/get-by-id-employee');
const OutputBoundary = require('../../../../src/app/use-case/employee/get-by-id/output-boundary');
const EmployeeRepositorySpy = require('../../../mocks/employee-repository');

const makeEmployeeSpyData = () => ({
  id: 'any-id',
})

const makeSut = () => {
  const employeeRepositorySpy = new EmployeeRepositorySpy();
  const employeeId = makeEmployeeSpyData();

  const sut = new GetByIdEmployeeUseCase({
    employeeRepository: employeeRepositorySpy
  });

  return {
    sut,
    employeeId,
    employeeRepositorySpy
  }
}

const mockReturnEmployeeRepository = (employeeRepositorySpy, employeeId) => {
  const mockReturn = {
    ...employeeId,
    age: 'any-age',
    name: 'any-name',
    office: 'any-office'
  };
  employeeRepositorySpy.fetchOne.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: get by id employee", () => {

  test("Should return employee", async () => {
    const { sut, employeeId, employeeRepositorySpy } = makeSut();
    const expected = mockReturnEmployeeRepository(employeeRepositorySpy, employeeId);
    const employee = await sut.handle(employeeId);

    expect(employee).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, employeeId, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employeeId);
    const employee = await sut.handle(employeeId);

    expect(employee).toBeInstanceOf(OutputBoundary);
  });

  test("Should call handle", async () => {
    const { sut, employeeId, employeeRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnEmployeeRepository(employeeRepositorySpy, employeeId);

    await sut.handle(employeeId);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(employeeId);
  });

  test("Should call fetchOne", async () => {
    const { sut, employeeId, employeeRepositorySpy } = makeSut();
    mockReturnEmployeeRepository(employeeRepositorySpy, employeeId);
    jest.spyOn(employeeRepositorySpy, 'fetchOne');
    await sut.handle(employeeId);

    expect(employeeRepositorySpy.fetchOne).toHaveBeenCalled();
    expect(employeeRepositorySpy.fetchOne).toHaveBeenCalledTimes(1);
    expect(employeeRepositorySpy.fetchOne).toHaveBeenCalledWith(employeeId.id);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new GetByIdEmployeeUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
