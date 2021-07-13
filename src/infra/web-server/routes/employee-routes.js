const {
  CreateEmployeeRouterComposer,
  GetByIdEmployeeRouterComposer,
  GetAllEmployeesRouterComposer,
  UpdateEmployeeRouterComposer,
  DeleteEmployeeRouterComposer
} = require("../../composers/employee");
const { adapt } = require("../../adapters/express-router-adapter");

const prefix = '/employees';

module.exports = (router) => {
  router.post(
    prefix,
    adapt(CreateEmployeeRouterComposer.compose())
  );

  router.get(
    `${prefix}/:id`,
    adapt(GetByIdEmployeeRouterComposer.compose())
  );

  router.get(
    prefix,
    adapt(GetAllEmployeesRouterComposer.compose())
  );

  router.put(
    `${prefix}/:id`,
    adapt(UpdateEmployeeRouterComposer.compose())
  );

  router.delete(
    `${prefix}/:id`,
    adapt(DeleteEmployeeRouterComposer.compose())
  );
};
