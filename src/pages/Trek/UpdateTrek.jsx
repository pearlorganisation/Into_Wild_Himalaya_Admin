import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm,Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { updateTrek } from "../../features/action/trek";
import Select from "react-select"
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ReactTextEditor from "../../components/TextEditor/JoditEditor";
// import {zodResolver} from "@hookform/resolvers/zod"
// import { z } from "zod";



const UpdateTrek = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {trekData,isLoading} = useSelector((state)=>state.trek)

  // const schema = z.object({
  //   price: z.number("Price is a number ")
  // })

    const {register,handleSubmit,formState: { errors },control}=useForm({
      // resolver: zodResolver(schema)
    })

    const [photo, setPhoto] = useState("");
    
    const defaultPhoto =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
    
    const handlePhotoChange = (e) => {
      const selectedPhoto = e.target.files[0];
      
      if (selectedPhoto) {
        
        const reader = new FileReader();
        reader.readAsDataURL(selectedPhoto);
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
      }
    };

    ////// gallery //////
    
    const [gallery, setGallery] = useState([]);

    const [selectedGallery,setSelectedGallery]=useState([])

    const handleGalleryChange = (e) => {
      const selectedImages = e.target.files;
  
      if (selectedImages.length > 0) {
        // Update an array to store file objects
        const imagesArray = [];
  
        Array.from(selectedImages).forEach((image) => {
          // Update a new File object
          const fileObject = new File([image], image.name, {
            type: image.type,
          });
  
          imagesArray.push(fileObject);
        });
  
        // Update the state with the array of file objects
        setSelectedGallery((prevGallery) => [...prevGallery, ...imagesArray]);
  // Convert the file objects to base64 for UI display
const base64Array = [];

// Update a counter to keep track of when all images are processed
let counter = 0;

imagesArray.forEach((fileObject) => {
const reader = new FileReader();
reader.readAsDataURL(fileObject);
reader.onloadend = () => {
base64Array.push(reader.result);

// Increment the counter
counter++;

// Check if all images are processed
if (counter === imagesArray.length) {
// Update the state with the base64Array
setGallery(base64Array
  );
}
};
});
}
};

const removeGalleryImage = (index) => {
  setGallery((prevGallery) => {
    const updatedGallery = [...prevGallery];
    updatedGallery.splice(index, 1);
    return updatedGallery;
  });
};

 ////// Banners  ///////

const [banner, setBanner] = useState([]);

const [selectedBanner,setSelectedBanner]=useState([])


    const handleBannerChange = (e) => {
      const selectedImages = e.target.files;
  
      if (selectedImages.length > 0) {
        // Update an array to store file objects
        const imagesArray = [];
  
        Array.from(selectedImages).forEach((image) => {
          // Update a new File object
          const fileObject = new File([image], image.name, {
            type: image.type,
          });
  
          imagesArray.push(fileObject);
        });
  
        // Update the state with the array of file objects
        setSelectedBanner((prevBanner) => [...prevBanner, ...imagesArray]);
  // Convert the file objects to base64 for UI display
const base64Array = [];

// Update a counter to keep track of when all images are processed
let counter = 0;

imagesArray.forEach((fileObject) => {
const reader = new FileReader();
reader.readAsDataURL(fileObject);
reader.onloadend = () => {
base64Array.push(reader.result);

// Increment the counter
counter++;

// Check if all images are processed
if (counter === imagesArray.length) {
// Update the state with the base64Array
setBanner(base64Array
  );
}
};
});
}
};

const removeBannerImage = (index) => {
  setBanner((prevBanner) => {
    const updatedBanner = [...prevBanner];
    updatedBanner.splice(index, 1);
    return updatedBanner;
  });
};

   

        const onSubmit = data =>{
    
            const {difficulty,season} = data;
            const difficultyValue = difficulty.value
            const seasonValue = season.value

            const formData = new FormData();
            formData.append("name",data?.name)
            formData.append("season",seasonValue)
            formData.append("price",data?.price)
            formData.append("ageLimit",data?.ageLimit)
            formData.append("duration",data?.duration)
            formData.append("altitude",data?.altitude)
            formData.append("trekTitle",data?.trekTitle)
            formData.append("description",data?.description)
            formData.append("difficulty",difficultyValue)
            Array.from(data?.trekLogo).forEach((img)=>{
              formData.append("trekLogo",img)
            })
            Array.from(data?.gallery).forEach((img)=>{
              formData.append("gallery",img)
            })
            Array.from(data?.banners).forEach((img)=>{
              formData.append("banners",img)
            })
            // console.log("treklogo",formData.getAll("trekLogo"))
            dispatch(updateTrek(formData))
            
          }
       
          useEffect(() => {
            if(trekData?.status){
              navigate("/trek")
            }
          }, [trekData]);

  return (
    <div>
        <div className="text-gray-600">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update trek details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
        <div className="w-full">
            <label className="font-medium">Trek Name</label>
            <input 
            {...register('name', { required: "Name is required" })}
              type="text"
              className="w-full mt-2 me-35 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            
                    <span className="text-red-500">
                    {errors?.name?.message}
                    </span>
                  
        </div>
        <div className="w-full">
            <label className="font-medium">Season</label>
            <Controller 
                                      control={control}
                                      name="season"
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              options={[{ value: "Winter", label: "Winter" },{value:"Pre-winter",label:"Pre-winter"},
                                              {value:"Autumn",label:"Autumn"},{value:"Monsoon",label:"Monsoon"},{value:"Spring",label:"Spring"},{value:"Summer",label:"Summer"},]}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Choose Season "
                                             
                                              styles={{
                                                  control: (provided) => ({
                                                      ...provided,
                                                      border: '1px solid #CBD5E1', // Set custom border style
                                                      borderRadius: '0.400rem', // Set custom border radius
                                                      height: '40px', // Add height here
                                                  }),
                                                  placeholder: (provided) => ({
                                                      ...provided,
                                                      color: '#9CA3AF', // Set custom placeholder color
                                                  }),
                                              }}
 
                                          />
                                     )}
                                      rules={{ required: true }}
                                      
                                  />
             {errors.season && (
                    <span className="text-red-500">
                      Season is required
                    </span>
                  )}
          </div>
        </div>
        <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
       
          <div className="w-full">
            <label className="font-medium">Price</label>
            <input 
            {...register('price', { required:"Price is required",  pattern: {
              value: /^[0-9]+(\.[0-9]+)?$/,
              message: 'Price must be a number'
            } })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             
                    <span className="text-red-500">
                    {errors?.price?.message}
                    </span>
                 
          </div>
          <div className="w-full">
            <label className="font-medium">Age Limit</label>
            <input 
            {...register('ageLimit', { required: true })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.ageLimit && (
                    <span className="text-red-500">
                      Age Limit is required
                    </span>
                  )}
          </div>
 </div>

 <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
         
          <div className="w-full">
            <label className="font-medium">Duration <span className="text-xs ">(days)</span></label>
            <input 
            {...register('duration', { required:true })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.duration && (
                    <span className="text-red-500">
                      Duration is required
                    </span>
                  )}
          </div>
         
          <div className="w-full">
            <label className="font-medium">Altitude</label>
            <input 
            {...register('altitude', { required:true })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.altitude && (
                    <span className="text-red-500">
                      Altitude is required
                    </span>
                  )}
          </div>
         </div>

         <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
          
            <div className="font-medium space-y-6"> Trek Thumbnail
             
            <img class="mt-2 w-20 h:20 sm:w-44 sm:h-36 rounded" src={photo || defaultPhoto} alt="No Image"/>
            <label htmlFor="file_input" className="flex
            " ><InsertPhotoOutlinedIcon/>
            <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
           
            <input
             {...register('trekLogo', { required: true,onChange:(e)=>{handlePhotoChange(e)} })}
           
             className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
              {errors.trekLogo && (
                    <span className="text-red-500 font-normal">
                       Trek Thumbnail is required
                    </span>
                  )}
            </div>
           
            </div>
            <div className="w-full">
            <label className="font-medium">Difficulty</label>
            <Controller 
                                      control={control}
                                      name="difficulty"
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              options={[{ value: "Easy", label: "Easy" },{value:"Moderate",label:"Moderate"},
                                              {value:"Hard",label:"Hard"}]}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Choose Difficulty "
                                             
                                              styles={{
                                                  control: (provided) => ({
                                                      ...provided,
                                                      border: '1px solid #CBD5E1', // Set custom border style
                                                      borderRadius: '0.400rem', // Set custom border radius
                                                      height: '40px', // Add height here
                                                  }),
                                                  placeholder: (provided) => ({
                                                      ...provided,
                                                      color: '#9CA3AF', // Set custom placeholder color
                                                  }),
                                              }}
 
                                          />
                                     )}
                                      rules={{ required: true }}
                                      
                                  />
             {errors.difficulty && (
                    <span className="text-red-500">
                      Difficulty is required
                    </span>
                  )}
          </div>
</div>

<div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
<div className="w-full">
          
          <div className="font-medium space-y-6 "> Banners 
           <div className="flex mt-2 flex-wrap sm:h-[175px] overflow-auto border rounded-lg ps-2">
          
           {banner.map((image, index) => (
        <div key={index} className="relative mr-3">
         <div className="w-full mt-2"> <img
            className="w-20 h-20 sm:w-18 sm:h-16 mr-5 rounded cursor-pointer"
            src={image}
            alt={`Banner Image ${index + 1}`}
            onClick={() => removeBannerImage(index)}
          />
          </div>
          <div
            className="absolute top-0 right-0 px-1 cursor-pointer bg-rose-400 rounded-md hover:bg-red-600"
            onClick={() => removeBannerImage(index)}
          >
            <span className="text-white text-sm">X</span>
          </div>
        </div>
      ))}
          </div>
  
          <label htmlFor="banner_input" className="flex" >
  <InsertPhotoOutlinedIcon/>
  <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div>
</label>
          <input
           {...register('banners', { onChange:(e)=>{handleBannerChange(e)} })}
           
           className="hidden" 
           id="banner_input" 
           type="file"
           multiple
           />
        
          </div>
          </div>

<div className="w-full">
          
          <div className="font-medium space-y-6 "> Gallery 
           <div className="flex mt-2 flex-wrap sm:h-[175px] overflow-auto border rounded-lg ps-2">
          
           {gallery.map((image, index) => (
        <div key={index} className="relative mr-3">
         <div className="w-full mt-2"> <img
            className="w-20 h-20 sm:w-18 sm:h-16 mr-5 rounded cursor-pointer"
            src={image}
            alt={`Gallery Image ${index + 1}`}
            onClick={() => removeGalleryImage(index)}
          />
          </div>
          <div
            className="absolute top-0 right-0 px-1 cursor-pointer bg-rose-400 rounded-md hover:bg-red-600"
            onClick={() => removeGalleryImage(index)}
          >
            <span className="text-white text-sm">X</span>
          </div>
        </div>
      ))}
          </div>
  
          <label htmlFor="gallery_input" className="flex" >
  <InsertPhotoOutlinedIcon/>
  <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div>
</label>
          <input
           {...register('gallery', {onChange:(e)=>{handleGalleryChange(e)} })}
           
           className="hidden" 
           id="gallery_input" 
           type="file"
           multiple
           />
          
          </div>
          </div>
  </div>

<div className="text-xl text-black">
  Content
</div>

<div className="w-full">
            <label className="font-medium">Trek Title</label>
            <input 
            {...register('trekTitle', { required: true})}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.trekTitle && (
                    <span className="text-red-500">
                      Title is required
                    </span>
                  )}
          </div>

<div className="full">
              <label className="font-medium ">Trek Description</label>
              <Controller
                name={`description`}
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <ReactTextEditor
                  
                    onChange={(data) => onChange(data)}
                  
                  />
                )}
                rules={{ required: true }}
              />

              {errors?.description && (
                <span className=" text-red-500">
                  Description is required
                </span>
              )}
            </div>

          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white bg-pink-700  font-medium hover:bg-pink-800 active:bg-pink-700 rounded-lg duration-150">
              {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Update</>)}
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default UpdateTrek