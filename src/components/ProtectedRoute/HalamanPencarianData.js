import ProtectedRoute from "./protect";
import GoogleLoginButton from "../LoginPage/GoogleLogin";
import PencarianData from "../../../pages/pencarianData";

const HalamanPencarianData = () => {
    return (
        <div>
      <h1>Halaman Pencarian Data</h1>
      {/* Tampilkan GoogleLoginButton jika belum login */}
      {!loggedIn && <GoogleLoginButton />}
      {/* Tampilkan konten pencarianData hanya jika sudah login */}
      {loggedIn && (
        <ProtectedRoute>
          <PencarianData />
        </ProtectedRoute>
      )}
    </div>

    )
}

export default HalamanPencarianData;