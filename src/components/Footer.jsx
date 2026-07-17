const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-4 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side */}
        <div className="flex items-center text-sm sm:text-base text-center md:text-left">
          <span>Created with</span>

          <img
            className="w-5 sm:w-6 mx-2"
            src="/icons/heart.png"
            alt="Heart"
          />

          <span>by AliHassanCoder@</span>
        </div>

        {/* Right Side */}
        <div className="logo font-bold text-xl sm:text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;