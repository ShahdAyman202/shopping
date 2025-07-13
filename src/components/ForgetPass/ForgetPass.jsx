import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
  });

  async function submitForm(val) {
  setLoading(true);
  try {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val);
    if (data.statusMsg === 'success') {
      localStorage.setItem('resetEmail', val.email); // خزّني الإيميل لاستخدامه لاحقًا
      navigate('/verifycode'); // روح لصفحة الكود
    }
  } catch (error) {
    setErrMsg(error?.response?.data?.message);
  } finally {
    setLoading(false);
  }
}

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: submitForm
  });

  return (
  <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
  <div className="mt-7 bg-white  rounded-xl shadow-lg   border-2 border-indigo-300">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-blue-800  ">Forgot password?</h1>
        <p className="mt-2 text-sm text-gray-600  ">
          Remember your password?
          <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#" onClick={() => navigate('/login')}>
            Login here   
          </a>
        </p>
      </div>
      <div className="mt-5">
        <form onSubmit={formik.handleSubmit}>
  <div className="grid gap-y-4">
    <div>
      <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 text-blue-950">
        Email address:
      </label>
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
        />
      </div>
      {formik.errors.email && formik.touched.email && (
        <p className="text-xs text-red-600 mt-2" id="email-error">
          {formik.errors.email}
        </p>
      )}
    </div>

    <button
      type="submit"
      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
    >
      {loading ? <i className="fas fa-spinner fa-spin me-2"></i> : null}
      Reset password
    </button>

    {errMsg && <p className="text-sm text-red-600 mt-4 text-center">{errMsg}</p>}
  </div>
</form>

      </div>
    </div>
  </div>
  
</main>

  );
}
