const employeeRoutes = require("./emp.routes");

module.exports = (app) => {
  app.use("/", employeeRoutes);
};