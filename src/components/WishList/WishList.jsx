import React, { useState, useEffect, useContext } from 'react';
import style from './WishList.module.css';
import { useNavigate } from 'react-router-dom';
import { WishContext } from '../WishContext/WishContext';
import toast from 'react-hot-toast'; // مهم جدًا لإظهار الرسائل
import Spinner from '../Spinner/Spinner';

export default function WishList() {
  const navigate = useNavigate();
  const { addToWishList, getUserWishList, deleteWishList, products } = useContext(WishContext);

  async function handleDelete(prodId) {
    let response = await deleteWishList(prodId);
    if (response?.data?.status === 'success') {
      toast.success('❌ Product deleted from wishlist');
    } else {
      toast.error('Error while deleting product...');
    }
  }

  useEffect(() => {
    getUserWishList();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-center text-blue-950 my-6 text-3xl font-bold">
        My Wish List
      </h1>

      {products?.length > 0 ? (
        products.map((prod) => (
          <div key={prod._id} className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start mb-4 p-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                className="absolute left-0 top-0 w-full h-full object-cover object-center"
                loading="lazy"
                src={prod.imageCover}
                alt={prod.title}
              />
            </div>

            <div className="flex  gap-2 flex-grow justify-between">
             <div className="flex-col">
               <p className="text-xl font-bold">{prod.title}</p>
              <p className="text-gray-600">Price: {prod.price} EGP</p>
             </div>

              <button
                onClick={() => handleDelete(prod._id)}
                className="text-red-600 font-semibold hover:underline w-fit"
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))
      ) :  <Spinner/>}
    </div>
  );
}
