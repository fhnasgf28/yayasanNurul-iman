import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import { auth } from '../../utils/firebaseConfig';


const EmailPasswordAuth = () => {
  const { register, handleSubmit, formState: {errors}} = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  }
  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      if (isLogin) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log('user signed up successfully');
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log('user signed in successfully');
      }
    } catch (error) {
      console.error (error);
        setErrorMessage('Authentication failed, please check your credentials');
      }
    };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={toggleAuthMode}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  )
};

export default EmailPasswordAuth;