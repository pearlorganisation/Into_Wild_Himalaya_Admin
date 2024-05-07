import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Stack,Skeleton } from '@mui/material';
import { deleteTrek, getAllTreks } from '../../features/action/trek';


const ViewTreks = () => {
  const { trekData, isDeleted, isLoading } = useSelector((state) => state.trek);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTreks());
   }, []);

   useEffect(() => {
 if(isDeleted){
   dispatch(getAllTreks());
 }
   }, [isDeleted]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteTrek(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };
  const handleAddTrek = () => {
    navigate('/createTrek');
  };


  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-sm">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Treks
            </h3>
            <p className="text-gray-600 mt-2">
            This page is for handle treks by Create, Update and Delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <button
              onClick={handleAddTrek}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
            >
              Add Trek
            </button>
          </div>
        </div>
        <div class="relative mt-4 ">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Trek, Season, Difficulty..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left ">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b justify-between">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Trek Name</th>
                <th className="py-3 px-6">Season</th>
                <th className="py-3 px-6">Difficulty</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Actions</th>
                
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            {isLoading ? (
            <tr>
            <td colSpan="6" className="text-center px-6 py-8">
              <Stack spacing={4}>
                <Skeleton variant="rounded" height={30} />
                <Skeleton variant="rounded" height={25}/>
                <Skeleton variant="rounded" height={20}/>
                <Skeleton variant="rounded" height={20}/>
                <Skeleton variant="rounded" height={20}/>
              </Stack>
            </td>
          </tr>
          ) : (
            Array.isArray(trekData) && trekData.length > 0 && trekData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{idx+1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.name }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.season}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.difficulty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.price}
                    </td>


                    <td className="px-3 whitespace-nowrap">
                      <button
                        onClick={() => {
                          navigate(`/updateTrek/${item?._id}`, { state: item });
                        }}
                        className="py-2 px-3 font-semibold text-green-500 hover:text-green-600 duration-150 hover:bg-gray-50 rounded-lg
                        "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="py-2 px-3 leading-none font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default ViewTreks;
