import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import Swal from "sweetalert2";

const AddItem = () => {
  const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
  const [axiosSecure] = useAxiosSecure()
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('image', data.image[0])

    fetch(image_hosting_url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imageResponse => {
      if(imageResponse.success){
        const imageURL = imageResponse.data.display_url
        const {name, price, category, recipe} = data
        const newItem = {name, price: parseFloat(price), category, recipe, image: imageURL}
        console.log(newItem)
        axiosSecure.post('/menu', newItem)
        .then(data =>{
          if(data.data.insertedId){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Item Added Successfully',
              showConfirmButton: false,
              timer: 1000
            })
            reset()
          }          
        })
      }
    })
  };
  return (
    <div className="w-full">
      <Helmet>
        <title>Bistro Boss | Add Item</title>
      </Helmet>
      <SectionTitle
        heading="Add an Item"
        subHeading="What's new"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="border-2 p-5 m-5">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Recipe*</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex">
          <div className="form-control w-full mr-4">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select defaultValue="Pick One" {...register("category", { required: true})} className="select select-bordered">
              <option disabled>
                Pick One
              </option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Drinks</option>
              <option>Dessert</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              {...register("price", { required: true})}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            {...register("recipe", { required: true})}
            placeholder="Details"
          ></textarea>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Item Image</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true})}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <input type="submit" value="Add Item" className="btn btn-sm mt-5" />
      </form>
    </div>
  );
};

export default AddItem;
