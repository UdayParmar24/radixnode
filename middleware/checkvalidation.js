const {body,validationResult} = require('express-validator');

const User = require("../models/users");

module.exports.userRegistrationValidation = [
    body('name')
        .isLength({min: 4}).withMessage('Name must be at least  4 characters long'),
    body('email').isEmail().normalizeEmail().custom((value,{req}) => {
        console.log(value);
        return User.findOne({where: {email: value} }).then(user => {
            if (user && req.params.id !== user.id) {
                throw new Error("User EMail already exists");
            }
            return true;
        })
    }),
    body('password').isLength({ min: 6 }).withMessage('Password should contain atleast 6 characters'),
    async (req, res, next) =>{
         const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        next();
    }
];


module.exports.userLoginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please enter Proper email'),
    async (req, res, next) =>{
         const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        next();
    }
];


module.exports.productAddValidation = [
    body('name').not().isEmpty().withMessage('Name required')
        .not().isAlphanumeric().withMessage('Name must be Alphanumeric'),
    body("price").not().isEmpty().withMessage('Price required'),
    body("description").isLength({ max: 255 }).withMessage('Max 255 Characters are allowed'),
    body('type').isIn(['print', 'promotional']).withMessage('Please enter valid value from [print, promotional].'),
    // .not().isDecimal().withMessage('Price Must be Decimal'),
    async (req, res, next) =>{
         const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        next();
    }
];

module.exports.productEditValidation = [
    body('name').not().isEmpty().withMessage('Name required')
        .not().isAlphanumeric().withMessage('Name must be Alphanumeric'),
    body("price").not().isEmpty().withMessage('Price required'),
    body("description").isLength({ max: 255 }).withMessage('Max 255 Characters are allowed'),
    // .not().isDecimal().withMessage('Price Must be Decimal'),
    async (req, res, next) =>{
         const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        next();
    }
];
