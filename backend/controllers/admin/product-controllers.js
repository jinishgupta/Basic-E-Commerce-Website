import Product from "../../models/product.js";
import { imageUploadUtil } from "../../helpers/cloudinary.js";

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            result,
        });

    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message
        });
    }
}

// add a new product
const AddProduct = async (req, res) => {
    console.log("Request body:", req.body);
    const { image, title, description, category ,price, brand, salePrice, totalStock } = req.body;

    try {
        const newProduct = new Product({
            image, title, description, category ,price, brand, salePrice, totalStock
        });
        await newProduct.save();
        res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: newProduct,
        });

    } catch(e) {
        console.error("Error in adding product:", e);
        const errorMessage = e.message || "Some error occurred";
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

// edit a product
const EditProduct = async (req, res) => {
    const { id } = req.params;
    const { image, title, description, category ,price, brand, salePrice, totalStock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            image, title, description, category ,price, brand, salePrice, totalStock
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch(e) {
        console.error("Error in updating product:", e);
        const errorMessage = e.message || "Some error occurred";
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

// fetch all products
const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    } catch(e) {
        console.error("Error in fetching products:", e);
        const errorMessage = e.message || "Some error occurred";
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

// delete a product
const DeleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }   
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch(e) {
        console.error("Error in deleting product:", e);
        const errorMessage = e.message || "Some error occurred";
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

export { handleImageUpload, AddProduct, EditProduct, GetAllProducts, DeleteProduct };