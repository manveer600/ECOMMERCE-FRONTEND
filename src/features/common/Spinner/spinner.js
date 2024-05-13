require('./spinner.css');
function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="loading-spinner"></div>
    <div className='font-bold text-xl font-serif text-cyan-800'>Loading.........</div>
  </div>
  );
}

export default Spinner;