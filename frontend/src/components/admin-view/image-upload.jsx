import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";


function ProductImageUpload({imageFile, setImageFile,isEditMode ,uploadImageUrl, setUploadImageUrl,isUploading, setIsUploading}) {

    const inputRef = useRef(null);
    function handleImageFileChange(event) {
        console.log(event.target.files, "event.target.files");
        const selectedFile = event.target.files?.[0];
        console.log(selectedFile);

        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function uploadImageToCloudinary() {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('my_file', imageFile);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', formData );
        if(response.data?.success) {
            setIsUploading(false);
            setUploadImageUrl(response.data.result.url);
        }
    }   

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloudinary();
        }
    }, [imageFile]);    

    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="text-long font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <Input id='image-upload' type="file" className="hidden" disabled={isEditMode} ref={inputRef} onChange={handleImageFileChange} />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode} ? cursor-not-allowed : flex flex-col items-center justify-center h-32 cursor-pointer `}
                    >
                        <UploadCloudIcon className= {`${isEditMode} ? opacity-60 : w-10 h-10 text-muted-foreground mb-2`} />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (
                    isUploading ? 
                    <Skeleton className="h-10 bg-gray-100" /> :
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

            export default ProductImageUpload;