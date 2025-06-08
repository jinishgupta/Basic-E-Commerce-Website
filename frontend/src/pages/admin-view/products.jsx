import { Fragment } from 'react'
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import CommonForm from '../../components/common/form';
import { addProductFormElements } from '../../config';
import { useState, useEffect } from 'react';
import ProductImageUpload from '../../components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts, AddProduct, DeleteProduct, EditProduct } from '../../store/admin/productSlice';
import { toast } from '../../components/ui/use-toast';
import AdminProductTile from '../../components/admin-view/product-tile';

function AdminProducts() {

    function onSubmit(event) {
        event.preventDefault();
        currentEditedId !== null
            ? dispatch(
                EditProduct({
                    id: currentEditedId,
                    formData,
                })
            ).then((data) => {
                console.log(data, "edit");
                if (data?.payload?.success) {
                    dispatch(GetAllProducts());
                    setFormData(initialFormData);
                    setOpenCreateProductDialog(false);
                    setCurrentEditedId(null);
                }
            })
            : dispatch(
                AddProduct({
                    ...formData,
                    image: uploadImageUrl,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(GetAllProducts());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: "Product add successfully",
                    });
                }
            });
    }

    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    const initialFormData = {
        image: null,
        title: '',
        description: '',
        category: '',
        price: 0,
        brand: '',
        salePrice: 0,
        totalStock: 0,
    }

    const [formData, setFormData] = useState(initialFormData);
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState("");
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(GetAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="mb-5 flex justify-end w-full">
                <Button onClick={() => { setOpenCreateProductDialog(true) }}> Add Product </Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {products?.length > 0 ? products.map((product) => (
                    <AdminProductTile
                        key={product._id}
                        product={product}
                        setFormData={setFormData}
                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                        setCurrentEditedId={setCurrentEditedId}
                        handleDelete={(productId) => {
                            dispatch(DeleteProduct(productId)).then(() => {
                                dispatch(GetAllProducts());
                            });
                        }}
                    />
                )) : <p className='text-center col-span-4'>No products found</p>}
            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={() => {
                setOpenCreateProductDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }} >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} isEditMode={currentEditedId !== null} setImageFile={setImageFile} isUploading={isUploading} setIsUploading={setIsUploading} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} />
                    <div className='py-6'>
                        <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText="Add" formControls={addProductFormElements} isBtnDisabled={!isFormValid()} >
                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts;