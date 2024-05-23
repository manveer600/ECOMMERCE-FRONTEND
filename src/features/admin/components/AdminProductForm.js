import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createProductAsync, fetchAllBrandsAsync, fetchAllCategoriesAsync, updateProductAsync } from "../../product/productSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdminProductForm() {
    const params = useParams();
    const brands = useSelector((state) => state.product.brands)
    const categories = useSelector((state) => state.product.categories)
    const selectedProduct = useSelector((state) => state.product.selectedProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();



    function handleDelete() {
        const product = { ...selectedProduct };
        product.deleted = true;
        dispatch(updateProductAsync(product));
    }

    // useEffect(() => {
    //     async function instant() {
    //         if (params.id) {
    //             await dispatch(fetchProductByIdAsync(params.id));
    //         }
    //     }

    //     instant();

    // }, [params.id])

    // useEffect(() => {
    //     (async function(){
    //         await dispatch(fetchAllBrandsAsync());
    //         await dispatch(fetchAllCategoriesAsync());
    //     })()
    // },[])

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title)
            setValue('description', selectedProduct.description)
            setValue('price', selectedProduct.price)
            setValue('stock', selectedProduct.stock)
            setValue('thumbnail', selectedProduct.thumbnail)
            setValue('brand', selectedProduct.brand)
            setValue('category', selectedProduct.category)
            setValue('discountPercentage', selectedProduct.discountPercentage)
            setValue('image1', selectedProduct.images[0])
            setValue('image2', selectedProduct.images[1])
            setValue('image3', selectedProduct.images[2])
        }
    }, [selectedProduct, params.id])



    return (
        // {
        //     "id": 91,
        //     "rating": 4.04,
        //     "images": [
        //       "https://cdn.dummyjson.com/product-images/91/4.jpg",
        //       "https://cdn.dummyjson.com/product-images/91/thumbnail.jpg"
        //     ]
        //   }
        <form noValidate onSubmit={handleSubmit(async (data) => {
            const product = { ...data };
            product.images = [product.image1, product.image2, product.image3]
            product.rating = 0;
            delete product['image1'];
            delete product['image2'];
            delete product['image3'];
            product.price = +product.price;
            product.rating = +product.rating
            product.discountPercentage = +product.discountPercentage
            product.stock = +product.stock
            if (params.id) {
                product.id = params.id
                product.rating = selectedProduct.rating || 1;
                const response = await dispatch(updateProductAsync(product));
                console.log('response after adding a product', response);
                if (response?.payload) {
                    navigate('/admin');
                }
            } else {
                const response = await dispatch(createProductAsync(product));
                reset();
                console.log('response while creating new product', response);
                if (response?.payload?.success) {
                    navigate(`/productdetails/${response.payload.product.id}`);
                }
            }
        })}>
            <div className="space-y-12 p-8 bg-white">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* PRODUCT NAME */}
                        <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        name="title"
                                        {...register('title', {
                                            required: 'Title is required',
                                            minLength: {
                                                value: 3,
                                                message: 'Title must be atleast 3 characters long',
                                            },
                                        })}

                                        id="title"
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Iphone "
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.title && (<p className="text-red-600 font-xl mt-1">{errors.title.message}</p>
                                )
                            }
                        </div>

                        {/* DESCRIPTION */}
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    {...register('description', {
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Description must be atleast 10 characters long'
                                        }
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    placeholder='Write a few description for your product'
                                />
                            </div>

                            {
                                errors && errors.description && (<p className="text-red-600 font-xl mt-1">{errors.description.message}</p>
                                )
                            }
                        </div>

                        {/* PRICE */}
                        <div className="sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price($)
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: {
                                                value: 1,
                                                message: 'Price must be atleast 1$'
                                            },
                                        })}
                                        autoComplete="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.price && (<p className="text-red-600 font-xl mt-1">{errors.price.message}</p>
                                )
                            }
                        </div>

                        {/* DISCOUNT */}
                        <div className="sm:col-span-2">
                            <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                Discount(%)
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        name="discount"
                                        id="discountPercentage"
                                        {...register('discountPercentage', {
                                            required: 'Discount Percentage is required',
                                            min: {
                                                value: 0,
                                                message: 'Discount must be between 0-100%'
                                            },
                                            max: {
                                                value: 100,
                                                message: "Discount must be between 0-100%"
                                            }

                                        })}

                                        autoComplete="discountPercentage"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="10%"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.discountPercentage && (<p className="text-red-600 font-xl mt-1">{errors.discountPercentage.message}</p>
                                )
                            }
                        </div>

                        {/* STOCK */}
                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock (in pcs)
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        name="stock"
                                        id="stock"
                                        {...register('stock', {
                                            required: 'Stock is required',
                                            min: {
                                                value: 1,
                                                message: 'There must be atleast 1 stock'
                                            }
                                        })}
                                        autoComplete="stock"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="50"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.stock && (<p className="text-red-600 font-xl mt-1">{errors.stock.message}</p>
                                )
                            }
                        </div>

                        {/* THUMBNAIL */}
                        <div className="sm:col-span-6">
                            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        name="thumbnail"
                                        id="thumbnail"
                                        {...register('thumbnail', {
                                            required: 'Thumbnail is required',
                                        })}
                                        autoComplete="stock"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.thumbnail && (<p className="text-red-600 font-xl mt-1">{errors.thumbnail.message}</p>
                                )
                            }
                        </div>

                        {/* IMAGE1 */}
                        <div className="sm:col-span-6">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        name="image1"
                                        id="image1"
                                        {...register('image1', {
                                            required: 'Image1 is required',
                                        })}
                                        autoComplete="image1"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.image1 && (<p className="text-red-600 font-xl mt-1">{errors.image1.message}</p>
                                )
                            }
                        </div>

                        {/* IMAGE2*/}
                        <div className="sm:col-span-6">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        name="image2"
                                        {...register('image2', {
                                            required: 'Image2 is required',
                                        })}
                                        id="image2"
                                        autoComplete="image2"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.image2 && (<p className="text-red-600 font-xl mt-1">{errors.image2.message}</p>
                                )
                            }
                        </div>

                        {/* IMAGE3 */}
                        <div className="sm:col-span-6">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        name="image3"
                                        {...register('image3', {
                                            required: 'Image3 is required',
                                        })}
                                        id="image3"
                                        autoComplete="image3"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {
                                errors && errors.image3 && (<p className="text-red-600 font-xl mt-1">{errors.image3.message}</p>
                                )
                            }
                        </div>

                        {/* BRANDS */}
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Brands
                            </label>
                            <div className="mt-2">
                                <select  {...register('brand', {
                                    required: 'Brand is required'
                                })}>
                                    <option value=''>--Choose Brand--</option>
                                    {brands.map((brand, index) => <option key={index} value={brand.value}>{brand.label} </option>)
                                    }                                </select>
                            </div>
                            {
                                errors && errors.brand && (<p className="text-red-600 font-xl mt-1">{errors.brand.message}</p>
                                )
                            }
                        </div>

                        {/* CATEGORIES */}
                        <div className="col-span-full">
                            <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
                                Categories
                            </label>
                            <div className="mt-2">
                                <select {...register('category', {
                                    required: 'Category is required'
                                })}>
                                    <option value=''>--Choose Category--</option>
                                    {categories.map((category, index) => <option key={index} value={category.value}>{category.label} </option>)
                                    }                                </select>
                            </div>
                            {
                                errors && errors.category && (<p className="text-red-600 font-xl mt-1">{errors.category.message}</p>
                                )
                            }
                        </div>


                    </div>
                </div>


            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                {params.id && <button
                    onClick={handleDelete}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Delete Product
                </button>}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default AdminProductForm;