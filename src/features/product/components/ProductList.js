import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants.js'
import { fetchAllBrandsAsync, fetchAllCategoriesAsync, fetchProductsByFilterAsync, } from '../productSlice.js';
import couldNotFindProduct from '../../../assets/couldNotFindProduct.png'
import { Pagination } from '../../common/Pagination.js';
const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector((state) => state.product.products);
  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);
  const totalItems = useSelector((state) => state.product.totalItems);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

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
    const newFilter = { ...filter };
    if (e.target.checked) {
      newFilter[section.id] = option.value;
    }

    setFilter(newFilter);
  }

  async function handleSorting(option) {
    const sort = { _sort: option.sort, _order: option.order }
    setSort(sort);
  }

  async function handlePage(page) {
    setPage(page);
  }

  useEffect(() => {
    (async function () {
      const pagination = { _page: page, _limit: ITEMS_PER_PAGE }

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
                                          name={`${section.id}`}
                                          type="radio"
                                          onChange={e => handleFilter(section, option, e)}
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
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

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
                                      name={`${section.id}`}
                                      type="radio"
                                      onChange={e => handleFilter(section, option, e)}
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

                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                        {products && products.length != 0 ? <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {products && products.map((product) => (
                            <Link to={`/productdetails/${product.id}`} key={product.id}>
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
                                {product.deleted && <p className='text-red-600'>Product Deleted</p>}
                                {product.stock === 0 && <p className='text-red-600'>Out of Stock</p>}

                              </div>

                            </Link>
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
                              Oops! We couldn't find this product with this brand!
                            </h2>
                            <p className="text-gray-600">Try to change the filter, or {" "}
                              <button className='text-blue-600 underline' onClick={() => window.location.reload()}>
                                GET ALL PRODUCTS
                              </button>

                            </p>
                          </div>}
                      </div>
                    </div>

                  </div>
                  {/* product grid end  */}
                </div>
              </section>

              <Pagination page={page} totalItems={totalItems} setPage={setPage} handlePage={handlePage} />
            </main>
          </div>
        </div>
      </div>
    </div>

  )
}


