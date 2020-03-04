const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (email) => {
      // Check if user already exists
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 Characters'),
  requirePasswordConfirmation: check('passwordConfirmation')
    // .trim()
    // .isLength({ min: 4, max: 20 })
    // .withMessage('Must be between 4 and 20 Characters')
    // .custom((passwordConfirmation, { req }) => {
    .custom((passwordConfirmation, { req }) => {
      // Check that password and passwordConfirmation match
      if (req.body.password !== passwordConfirmation) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });

      if (!user) {
        throw new Error('Email not found');
      }
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error('Invalid password');
      }

      if (!await usersRepo.comparePasswords(user.password, password)) {
        throw new Error('Invalid password');
      }
    })
};
