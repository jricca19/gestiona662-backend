const { teacherValidationSchema, staffValidationSchema } = require("../routes/validations/user.validation");

const updateProfile = async (req, res) => {
  const { role } = req.user; // El rol viene del token decodificado en el middleware
  const { body } = req;

  let validationSchema;
  if (role === "TEACHER") {
    validationSchema = teacherValidationSchema;
  } else if (role === "STAFF") {
    validationSchema = staffValidationSchema;
  } else {
    res.status(400).json({ message: "Rol inválido" });
    return;
  }

  const { error } = validationSchema.validate(body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  // Aquí puedes agregar la lógica para actualizar el perfil en la base de datos
  // usando el rol para determinar qué campos actualizar.
  // Por ejemplo:
  // if (role === "TEACHER") { ...actualizar perfil de maestro... }
  // if (role === "STAFF") { ...actualizar perfil de personal... }

  res.status(200).json({ message: "Perfil actualizado exitosamente" });
};

module.exports = {
  updateProfile,
};
