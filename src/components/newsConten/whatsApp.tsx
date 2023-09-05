import 'font-awesome/css/font-awesome.min.css';


const FloatingWhatsApp = () => {
    const whatsappStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        fontSize: '32px', // Ukuran teks besar
        width: '60px', // Lebar tombol
        height: '60px', // Tinggi tombol
        backgroundColor: '#25d366', // Warna latar belakang
        color: '#fff', // Warna ikon
        borderRadius: '50%', // Bentuk bulat
        textAlign: 'center',
        boxShadow: '2px 2px 3px #999', // Bayangan
        zIndex: '100', // Indeks z
      };
    
    return (
      <a
        href="https://api.whatsapp.com/send?phone=83823290281"
        style={whatsappStyle}
        target="_blank"
        rel="noopener noreferrer" // Untuk keamanan
      >
        <i className="fa fa-whatsapp my-float"></i>
      </a>
    );
  };
  
  export default FloatingWhatsApp;