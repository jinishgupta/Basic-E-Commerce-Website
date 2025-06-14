import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                                }`}
                        >
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            {/* <StarRatingComponent rating={averageReview} /> */}
                                 <StarIcon />
                        </div>
                        <span className="text-muted-foreground">
                            {/* ({averageReview.toFixed(2)}) */}
                            55 reviews
                        </span>
                    </div>
                    <div className="mt-5 mb-5">
                        {productDetails?.totalStock === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed">
                                Out of Stock
                            </Button>
                        ) : (
                            <Button
                                className="w-full"
                                onClick={() =>
                                    handleAddToCart(
                                        productDetails?._id,
                                        productDetails?.totalStock
                                    )
                                }
                            >
                                Add to Cart
                            </Button>
                        )}
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>
                                        JG
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Jinish</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="h-4 w-4" />
                                    </div>
                                    <p>
                                        This is a good product.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>
                                        JG
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Jinish</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="h-4 w-4" />
                                    </div>
                                    <p>
                                        This is a good product.
                                    </p>
                                </div>
                            </div><div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>
                                        JG
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Jinish</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="h-4 w-4" />
                                    </div>
                                    <p>
                                        This is a good product.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-2">
                                <Input placeholder="Write a review.." />
                                <Button className="mt-2">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default ProductDetailsDialog;