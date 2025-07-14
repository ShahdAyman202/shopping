import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const validationSchema = yup.object({
    resetCode: yup.string().required('Code is required'),
  });

  const formik = useFormik({
    initialValues: { resetCode: '' },
    validationSchema,
    onSubmit: async (values) => {
  const payload = {
    resetCode: values.resetCode.trim(), // ✅ كده هنشيل المسافات
  };

  console.log("Sending:", payload);

  try {
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, payload);
    navigate('/resetpassword');  
  } catch (error) {
    console.log("Error:", error.response?.data);
    setErrMsg(error.response?.data?.message);
  }
}

  });

  return  <>
  <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
  <div className="mt-7 bg-white  rounded-xl shadow-lg   border-2 border-indigo-300">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-blue-800  "> Verify Code</h1>
        
      </div>
      
      <div className="mt-5">
        <form onSubmit={formik.handleSubmit}  >
  <div className="grid gap-y-4">
    <div>
      <label htmlFor="resetCode" className="block text-sm font-bold ml-1 mb-2 text-blue-950">
        Enter Code:
      </label>
      <div className="relative">
        <input
          type="text"
          id="resetCode"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
        />
      </div>
      {formik.errors.resetCode && formik.touched.resetCode && (
        <p className="text-xs text-red-600 mt-2" id="email-error">
          {formik.errors.resetCode}
        </p>
      )}
    </div>

    <button
      type="submit"
      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
    >
       
     Verify Code
    </button>

     
  </div>
</form>

      </div>
       </div>
  </div>
  
</main>
  </>
}
