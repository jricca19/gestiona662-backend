const Department = require("../models/department.model");
const {getDepartments, findDepartmentById} = require("../repositories/department.repository");

const healthController = (req, res) => {
  res.status(200).send({
    message: "Service is running",
  });
};

const getDepartmentsController = async (req, res) => {
  try {
    const departments = await getDepartments();
    res.status(200).send(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDepartmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await findDepartmentById(id);
    if (!department) {
      return res.status(404).send({ error: "Department not found" });
    }
    res.status(200).send(department.cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  healthController,
  getDepartmentsController,
  getDepartmentController,
};
