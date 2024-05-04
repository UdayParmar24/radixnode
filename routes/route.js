const route = require('express').Router();

const validation = require('../middleware/checkvalidation');
const authentication =require('../middleware/authentcation')

const User = require('../controllers/auth');
const Product = require('../controllers/product');

route.post('/api/auth/register',validation.userRegistrationValidation,User.registration);
route.post('/api/auth/login',validation.userLoginValidation,User.login);

route.post('/api/products',authentication,validation.productAddValidation,Product.addProducts);
route.put('/api/products/:id',authentication,validation.productEditValidation,Product.editProducts);
route.get('/api/products',authentication,Product.getAllProducts);
route.get('/api/products/:id',authentication,Product.getSpecificProducts);
route.delete('/api/products/:id',authentication,Product.deleteProductById);

module.exports = route;