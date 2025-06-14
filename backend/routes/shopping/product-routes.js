import express from 'express';
import {getAllProducts, getProductDetails} from '../../controllers/shopping/product-controller.js';

const userProductRouter = express.Router();
userProductRouter.get('/getAll', getAllProducts);
userProductRouter.get('/get/:id', getProductDetails);

export { userProductRouter };