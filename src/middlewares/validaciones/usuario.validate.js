const { body } = require('express-validator');

const validarRegisterUsuario = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .notEmpty()
    .withMessage('El apellido es obligatorio') 
    .isLength({ min: 2 })
    .withMessage('El apellido debe tener al menos 2 caracteres'),
    
  // CAMPOS OPCIONALES:
  body('direccion')
    .optional() 
    .isLength({ min: 5 })
    .withMessage('La dirección debe tener al menos 5 caracteres'),
  body('localidad')
    .optional() 
    .isLength({ min: 2 })
    .withMessage('La localidad debe tener al menos 2 caracteres'),
  body('nro_doc')
    .notEmpty()
    .withMessage('El número de documento es obligatorio')
    .isLength({ min: 7 })
    .withMessage('El número de documento debe tener al menos 7 caracteres')
    .isNumeric()
    .withMessage('El número de documento debe ser numérico'),
  body('cod_postal')
    .optional() 
    .isLength({ min: 4 })
    .withMessage('El código postal debe tener al menos 4 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('telefono')
    .optional()
    .isLength({ min: 10 })
    .withMessage('El teléfono debe tener al menos 10 caracteres'),
];


const loginUsuarioValidate = [
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio') 
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const validarMiPerfilUsuario = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('direccion')
    .optional()
    .isLength({ min: 5 })
    .withMessage('La dirección debe tener al menos 5 caracteres'),
  body('localidad')
    .optional()
    .isLength({ min: 2 })
    .withMessage('La localidad debe tener al menos 2 caracteres'),
  body('nro_doc')
    .notEmpty()
    .withMessage('El número de documento es obligatorio')
    .isNumeric()
    .withMessage('El número de documento debe ser numérico')
    .isLength({ min: 7 })
    .withMessage('El número de documento debe tener al menos 7 caracteres'),
  body('cod_postal')
    .optional()
    .isLength({ min: 4 })
    .withMessage('El código postal debe tener al menos 4 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('telefono')
    .optional()
    .isLength({ min: 10 })
    .withMessage('El teléfono debe tener al menos 10 caracteres'),
];

const validarPassword = [
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('password_actual')
    .notEmpty()
    .withMessage('La contraseña actual es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña actual debe tener al menos 6 caracteres'),
  body('password_confirm')
    .notEmpty()
    .withMessage('La confirmación de la contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La confirmación de la contraseña debe tener al menos 6 caracteres')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),

];

module.exports = {
  validarRegisterUsuario,
  validarMiPerfilUsuario,
  validarPassword,
  loginUsuarioValidate
};
