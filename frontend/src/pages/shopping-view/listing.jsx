import ProductFilter from "../../components/shopping-view/filter.jsx";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import ProductDetailsDialog from "../../components/shopping-view/product-detail.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { sortOptions } from "../../config";
import ShoppingProductTile from "../../components/shopping-view/product-tile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetails } from "../../store/shopping/productSlice.js";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {

    const [sort, setSort] = useState(null);
    const [filters, setFilters] = useState({});
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, productDetails } = useSelector((state) => state.userProducts);
    const categorySearchParam = searchParams.get("category");
    const [open, setOpen] = useState(false);

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption =
                cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1)
                cpyFilters[getSectionId].push(getCurrentOption);
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }

        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    function handleGetProductDetails(productId) {
        console.log("Product ID:", productId);
        dispatch(getProductDetails(productId));
    }

    useEffect(() => {
        if (productDetails) {
            setOpen(true);
        }
    }, [productDetails]);

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, [categorySearchParam]);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    useEffect(() => {
        if (filters !== null && sort !== null)
            dispatch(
                getAllProducts({ filterParams: filters, sortParams: sort })
            );
    }, [dispatch, sort, filters]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                            {products?.length} Products
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            value={sortItem.id}
                                            key={sortItem.id}
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    {products?.length > 0 ? products.map((product) => (
                        <ShoppingProductTile
                            product={product}
                            handleGetProductDetails={handleGetProductDetails}
                        />
                    )) : <p className='text-center col-span-4'>No products found</p>}
                </div>
                <div>
                    <ProductDetailsDialog
                        open={open}
                        setOpen={setOpen}
                        productDetails={productDetails}
                    />
                </div>
            </div>
        </div>
    );
}

export default ShoppingListing;