import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants.js'
import { deleteProductAsync, fetchAllBrandsAsync, fetchAllCategoriesAsync, fetchProductsByFilterAsync, updateProductAsync, } from '../../product/productSlice.js';
import couldNotFindProduct from '../../../assets/couldNotFindProduct.png'
import toast from 'react-hot-toast';
import { Pagination } from '../../common/Pagination.js';
import { useForm } from 'react-hook-form';
const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function AdminProductList() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector((state) => state.product.products);
  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);
  const totalItems = useSelector((state) => state.product.totalItems);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const filters = [

    {
      id: 'category',
      name: 'Category',
      options: categories
    },
    {
      id: 'brand',
      name: 'Brands',
      options: brands
    }
  ]

  async function handleFilter(section, option, e) {
    setIsFilterApplied(true);
    const newFilter = { ...filter };
    if (e.target.checked) {
      newFilter[section.id] = option.value;
    }

    setFilter(newFilter);
  }

  async function handleSorting(option) {
    setIsFilterApplied(true);
    const sort = { _sort: option.sort, _order: option.order }
    setSort(sort);
  }

  async function handlePage(page) {
    setPage(page);
  }

  function editProduct(product, index) {
    console.log(product);
    setSelectedEditIndex(index);
    console.log('product is this', product);
    setValue('title', product.title);
    setValue('description', product.description);
    setValue('thumbnail', product.thumbnail);
    setValue('price', product.price);
    setValue('discountPercentage', product.discountPercentage);
    setValue('stock', product.stock);
    setValue('image1', product.images[0]);
    setValue('image2', product.images[1]);
    setValue('image3', product.images[2]);
    setValue('category', product.category);
    setValue('brand', product.brand);
  }

  function cancelEditProduct() {
    setSelectedEditIndex(-1);
  }

  async function deleteProduct(product) {
    const response = await dispatch(deleteProductAsync(product.id));
    if (response?.payload?.success) {
      toast.success('Product deleted successfully', {
        id: 'productDeleted',
        duration: 2000
      });
      await dispatch(fetchProductsByFilterAsync({}));
    }
  }

  async function showConfirmationToast(product) {
    console.log('product is this', product);
    toast((t) => (
      // console.log('t is this', t)
      <div>
        <p className='font-serif italic'>Are you sure you want to delete this product: <span className='font-extrabold'>{product.title}</span></p>
        <div className='flex justify-between align-center mt-5'>
          <button className='text-red-600 border border-red-500 p-2 rounded' onClick={(e) => {
            toast.dismiss(t.id);
            deleteProduct(product);
          }}>Confirm</button>
          <button className='text-green-600 border border-green-500 p-2 rounded' onClick={(e) => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </div>
    ), {
      id: 'confirmationToast',
      position: 'top-center'
    })
  }


  useEffect(() => {
    (async function () {
      const pagination = { page: page, limit: ITEMS_PER_PAGE }
      await dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
      await dispatch(fetchAllBrandsAsync());
      await dispatch(fetchAllCategoriesAsync());
    }
    )()
  }, [dispatch, filter, sort, page])

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort])

  return (
    <div className='font-serif'>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">


                        {filters && filters.map((section) => (
                          <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                      ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section && section.options && section.options.map((option, optionIdx) => (
                                      <div key={option.value} className="flex items-center">
                                        <input
                                          id={`filter-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="radio"
                                          defaultChecked={option.checked}
                                          onClick={e => handleFilter(section, option, e)}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                          htmlFor={`filter-${section.id}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
                    {isFilterApplied && <h3 onClick={(e) => window.location.reload()} className='underline hover:text-blue-900 text-blue-700 cursor-pointer'>Clear filters</h3>
                    }
                  </div>
                </div>
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  href={option.href}
                                  onClick={e => handleSorting(option)}
                                  className={classNames(
                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>


                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section aria-labelledby="products-heading" className="pb-24 pt-6">


                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    {filters && filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section && section.options && section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="radio"
                                      onClick={e => handleFilter(section, option, e)}
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    <div className='mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8'>
                      <Link to='/admin/product-form'
                        className=" flex mt-2 items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add New Product
                      </Link>
                    </div>
                    <div className=' md:flex md:space-x-2 mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8'>
                      <Link to='/admin/add-category/brand'
                        className="w-full flex mt-2 items-center justify-center rounded-md border border-transparent bg-yellow-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add New Category/Brand
                      </Link>
                    </div>

                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                        {products && products.length != 0 ? <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {products && products.map((product, index) => (
                            <div key={index}>
                              {
                                selectedEditIndex === index ?
                                  <form noValidate onSubmit={handleSubmit(async (data) => {
                                    data = { ...data, id: product.id }
                                    console.log('data is this', data);
                                    const response = await dispatch(updateProductAsync(data));
                                    if (response?.payload?.success) {
                                      setSelectedEditIndex(-1);
                                      return toast.success('Product updated successfully', {
                                        id: 'productUpdatedSuccess',
                                        duration: 1000
                                      })
                                    }
                                    else {
                                      return toast.error('Unable to update the product right now! Please try later', {
                                        id: 'productUpdatedFailure',
                                        duration: 3000
                                      });
                                    }
                                  })}>
                                    <div className="space-y-12 bg-white">
                                      <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Product Details</h2>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          {/* PRODUCT TITLE */}
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
                                                  placeholder="Iphone"
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
                                              Discount
                                            </label>
                                            <div className="mt-2">
                                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                                <input
                                                  type="number"
                                                  name="discountPercentage"
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
                                              Stock
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
                                                    required: 'Thumbnail is required'
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
                                                    required: 'Image1 is required'
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
                                            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                              Image 2
                                            </label>
                                            <div className="mt-2">
                                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                                <input
                                                  type="text"
                                                  name="image2"
                                                  {...register('image2', {
                                                    required: 'Image2 is required'
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
                                                    required: 'Image3 is required'
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
                                                }
                                              </select>
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

                                    <div className="mt-3 mb-6 text-center">
                                      <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                      >
                                        Update Product
                                      </button>
                                    </div>
                                  </form> : null
                              }

                              {/* PRODUCT DETAILS WALA PAGE KHULEGAA */}
                              {product && <Link to={`/productdetails/${product.id}`} >
                                <div key={product.id} className="group relative">
                                  <div className="aspect-h-1 border-2 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                  </div>
                                  <div className="mt-4 flex space-y-0 justify-between">
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <div href={product.thumbnail}>
                                          <span aria-hidden="true" className="absolute inset-0" />
                                          {product.title}
                                        </div>
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                      <div className=" text-sm flex justify-center items-center space-x-2 mt-0 text-gray-500 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-10">
                                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <p>{product.rating}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-gray-900">{discountedPrice(product)} <svg className='inline h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z" clipRule="evenodd" />
                                      </svg></p>
                                      <p className="text-sm line-through font-medium text-gray-900">{product.price}

                                      </p>
                                    </div>

                                  </div>

                                </div>
                              </Link>}

                              {/* WHETHER A PRODUCT IS DELETED OR OUT OF STOCK */}
                              <div className='flex justify-between'>
                                {product && product.deleted === true && <p className='text-red-600'>Product Deleted</p>}
                                {product && product.stock == 0 && <p className='text-red-600'>Out of Stock</p>}
                              </div>

                              {/* EDIT AND DELETE PRODUCT */}
                              <div className='flex justify-between'>
                                {selectedEditIndex !== index && <button className='border-2 px-2 text-blue-700 hover:font-bold'
                                  onClick={() => editProduct(product, index)}>
                                  Edit
                                </button>}
                                {selectedEditIndex === index && <button className='border-2 px-2 text-blue-700 hover:font-bold'
                                  onClick={() => cancelEditProduct()}>
                                  Cancel
                                </button>}
                                <button className='border-2 px-2 text-red-800 hover:font-bold'
                                  onClick={(e) => showConfirmationToast(product)}>
                                  Delete
                                </button>
                              </div>

                            </div>
                          ))}
                        </div> :
                          <div className="flex flex-col items-center  h-screen">
                            <img
                              src={couldNotFindProduct}
                              alt="Cute robot"
                              height={500}
                              width={500}
                              className="mb-4"
                            />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                              Oops! We couldn't find this product!
                            </h2>

                            <button className='text-blue-600 underline' onClick={() => window.location.reload()}>
                              GET ALL PRODUCTS
                            </button>
                          </div>}
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              <Pagination page={page} totalItems={totalItems} setPage={setPage} handlePage={handlePage}></Pagination>
            </main>
          </div>
        </div>
      </div>
    </div>

  )
}



// function Pagination({ page, setPage, handlePage, totalItems }) {
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
//   return (
//     <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//         <div onClick={e => handlePage(page > 1 ? page - 1 : page)}
//           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
//           Previous
//         </div>
//         <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
//           Next
//         </div>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{' '}
//             <span className="font-medium">{totalItems}</span> results
//           </p>
//         </div>
//         <div>
//           <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//             <div onClick={e => handlePage(page > 1 ? page - 1 : page)}
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
//               <span className="sr-only">Previous</span>
//               <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//             {
//               Array.from({ length: totalPages }).map((el, index) => (
//                 <div key={index} onClick={e => handlePage(index + 1)}
//                   aria-current="page"
//                   className={`relative cursor-pointer z-10 inline-flex items-center ${index + 1 === page ? 'bg-indigo-600 text-black' : 'text-gray-600 '} border-2 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
//                   {index + 1}

//                 </div>))
//             }
//             <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//           </nav>
//         </div>
//       </div>
//     </div>
//   )
// }