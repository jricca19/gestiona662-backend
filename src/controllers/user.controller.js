const { teacherValidationSchema } = require("../routes/validations/user.validation");

//TODO: actualizacion de datos de usuario
const putUserProfile = async (req, res) => {
  const { role } = req.user;
  const { body } = req;

  const validationSchema =
    role === "TEACHER" ? teacherValidationSchema :
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
