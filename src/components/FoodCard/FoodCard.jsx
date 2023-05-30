import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const [ , refetch] = useCart()
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    const cartItem = {menuItemId: _id, name, image, price, email: user.email}
    if (user) {
      fetch("http://localhost:5000/carts", {
        method: 'POST', 
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // refetching cart to update the number of the cart
            refetch()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Food Added On The Cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login to Order Food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">
        {price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;