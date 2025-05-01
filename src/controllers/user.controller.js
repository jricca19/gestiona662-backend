const { teacherValidationSchema, staffValidationSchema } = require("../routes/validations/user.validation");

const putUserProfile = async (req, res) => {
  const { role } = req.user; // El rol viene del token decodificado en el middleware
  const { body } = req;

  const validationSchema =
    role === "TEACHER" ? teacherValidationSchema :
    role === "STAFF" ? staffValidationSchema :
    null;

  if (!validationSchema) {
    return res.status(400).json({ message: "Rol inválido" });
  }

  const { error } = validationSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Aquí puedes agregar la lógica para actualizar el perfil en la base de datos
  // usando el rol para determinar qué campos actualizar.
  res.status(200).json({ message: "Perfil actualizado exitosamente" });
};

module.exports = {
    putUserProfile,
};
