import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function Pagination({ page, totalItems, setPage, handlePage }) {
  const totalPages = Math.ceil(totalItems / 12);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* SMALLER SCREEN SIZE */}
      <div className="flex w-full justify-between sm:hidden">
        <div onClick={e => handlePage(page > 1 ? page - 1 : page)}
          className="relative hover:bg-yellow-400 hover:text-black inline-flex items-center rounded-md border border-gray-300  bg-white px-4 py-2 text-sm font-medium text-gray-700">
          <button disabled={page == 1}>
            Previous
          </button>

        </div>
        <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)} className="hover:bg-yellow-400 hover:text-black relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
          <button disabled={page == totalPages}>
            Next
          </button>
        </div>
      </div>
      {/* LARGER SCREEN SIZE */}
      <div className="hidden sm:flex gap-2 w-full  sm:items-center sm:justify-between">
        {/* 1ST DIV SHOWING NUMBERS */}
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * 12 + 1}</span> to <span className="font-medium">
              {page * 12}
            </span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        {/* 2ND DIV ACTUALLY SHOWING PAGINATION */}
        <div className=" overflow-x-auto  ">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div onClick={e => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {/* <span className="sr-only border-2 border-black">Previous paaji</span> */}
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {
              Array.from({ length: totalPages }).map((el, index) => (
                <div key={index} onClick={e => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer z-10 inline-flex items-center ${index + 1 === page ? 'bg-indigo-600 text-black' : 'text-gray-600 '} border-2 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                  {index + 1}

                </div>))
            }
            <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5 " aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}