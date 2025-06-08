import express from 'express';
import {handleImageUpload, AddProduct, EditProduct, GetAllProducts, DeleteProduct} from '../../controllers/admin/product-controllers.js';
import { upload } from '../../helpers/cloudinary.js';

const adminProductRouter = express.Router();
adminProductRouter.post('/upload-image', upload.single("my_file") ,handleImageUpload);
adminProductRouter.post('/add', AddProduct);
adminProductRouter.put('/edit/:id', EditProduct);
adminProductRouter.get('/getAll', GetAllProducts);
adminProductRouter.delete('/delete/:id', DeleteProduct);

export { adminProductRouter };