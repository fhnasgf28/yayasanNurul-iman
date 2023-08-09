const LeftOverlayContent = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
        Tidak Punya Akun ?
      </h1>

      <h5 className="text-lg md:text-xl text-white">Sign In dengan Akun Google Anda </h5>
      <div className="mt-8 md:mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white text-base md:text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={(e) => {
            setIsAnimated(!isAnimated);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
