import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail'); // 🟢 لازم تجيبيه من localStorage

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required('New password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Weak password'),
  });

  const formik = useFormik({
    initialValues: { newPassword: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
          email,
          newPassword: values.newPassword,
        });
        localStorage.removeItem('resetEmail'); // 🧹 نظف بعد الاستخدام
        navigate('/login');
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },
  });

  return (
   <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
  <div className="mt-7 bg-white  rounded-xl shadow-lg   border-2 border-indigo-300">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-blue-800  "> Reset Password</h1>
        
      </div>
      
      <div className="mt-5">
        <form onSubmit={formik.handleSubmit}  >
  <div className="grid gap-y-4">
    <div>
      <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 text-blue-950">
        Enter New Password:
      </label>
      <div className="relative">
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
        />
      </div>
      {formik.errors.newPassword && formik.touched.newPassword && (
        <p className="text-xs text-red-600 mt-2" id="email-error">
          {formik.errors.newPassword}
        </p>
      )}
    </div>

    <button
      type="submit"
      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
    >
       
    Reset  
    </button>

     
  </div>
</form>

      </div>
       </div>
  </div>
  
</main>
  );
}
