import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseApp from "../../utils/firebase"; // Import konfigurasi Firebase dari file yang sesuai



const GoogleLoginButton = () => {
  const auth = getAuth(firebaseApp); // Menggunakan konfigurasi Firebase
  const provider = new GoogleAuthProvider();
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User successfully logged in with Google:", user);
      // Lakukan navigasi atau tindakan lain setelah login berhasil
      redirectToDataSiswaPencarianData();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  const redirectToDataSiswaPencarianData = () => {
    // Implementasi manual navigasi ke halaman yang diinginkan
    window.location.href = "/pencarianData";
  };

  return (
    <button onClick={handleGoogleLogin} className="mt-8 md:mt-12 px-6 md:px-8 py-3 md:py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
