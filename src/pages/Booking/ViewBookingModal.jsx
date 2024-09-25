import React from 'react'
import parse from "html-react-parser"

export default function ViewBookingModal ({viewData,setModal}) {
    const createdAtDate = viewData?.createdAt ? new Date(viewData?.createdAt) : null;
  const formattedDate = createdAtDate ? createdAtDate.toISOString().split('T')[0] : '';

  return (
    <div
    className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
    aria-labelledby="header-3a content-3a"
    aria-modal="true"
    tabindex="-1"
    role="dialog"
  >
    {/*    <!-- Modal --> */}
    <div
      className="flex h-[90%] w-[80%] sm:w-[80%]  flex-col gap-6 overflow-hidden rounded bg-white p-6 shadow-xl "
      id="modal"
      role="document"
    >
      {/*        <!-- Modal header --> */}
      <header id="header-3a" className="flex items-center gap-4">
        <h3 className="flex-1 text-xl font-medium text-slate-700">
        Booking Data
        </h3>
        <div>Order Date : {formattedDate} </div>
        <button
          onClick={() => setModal(false)}
          className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
          aria-label="close dialog"
        >
          <span className="relative only:-mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              role="graphics-symbol"
              aria-labelledby="title-79 desc-79"
            >
              <title id="title-79">Icon title</title>
              <desc id="desc-79">
                A more detailed description of the icon
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </header>
      {/*        <!-- Modal body --> */}
      <div id="content-3a" className="flex-1 overflow-auto space-y-10 ">

      <table className="w-full table-auto text-sm">
    <tbody className="text-gray-600">
      <tr>
        <td className="py-2 px-4 border border-gray-300">Tour Name</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData?.tourId?.title: ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Tour Date</td>
        <div className='flex items-center '>
        <div className='p-2 space-x-2 bg-slate-100'>
        <span className='bg-white mb-2 rounded-md px-2 '> Start Date : {viewData?.tourDate?.startDate}</span    >
        <span className='bg-white mb-2 rounded-md px-2 '> End Date : {viewData?.tourDate?.endDate}</span>
        </div>
        </div>

      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Pay Amount</td>
        <td className="py-2 px-4 border border-gray-300">₹ {viewData ? viewData?.amount : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">User Email</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData?.email : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Members Detail</td>
        <td className="py-2 px-4 border border-gray-300">
        {Array.isArray(viewData?.memberNames) && viewData?.memberNames?.map((priceItem,idy)=>(
                         <div className=' bg-slate-100 flex mb-2 rounded-md px-2 gap-2 w-fit' key={idy}>
                         <div className='flex items-center '><span className='bg-white  rounded-md px-2'>{idy+1} :</span> </div>
                         <div className='p-2 space-x-2'>
                      <span className='bg-white mb-2 rounded-md px-2 '> Fullname : {priceItem?.firstName} {priceItem?.lastName}</span>
                      <span className='bg-white mb-2 rounded-md px-2 '> Email : {priceItem?.email}</span>
                      <span className='bg-white mb-2 rounded-md px-2 '> Contact No. : {priceItem?.number}</span>
                      <span className='bg-white mb-2 rounded-md px-2 '> Height : {priceItem?.height} cm</span>
                      <br/>
                      <div className='p-2 space-x-2'>
                      <span className='bg-white my-2 rounded-md px-2 '> Weight : {priceItem?.weight} kg</span>
                      <span className='bg-white mb-2 rounded-md px-2 '> DOB : {priceItem?.dob}</span>
                      </div>
                    
                  
                   
                      </div>
                      </div>
                     )) }
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Razorpay Payment Id</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData?.razorpay_payment_id : ''}</td>
      </tr>
      

      
    </tbody>
  </table>
      </div>

</div>
</div>
  )
}
