require('./spinner.css');
export default function Loader() {
  return (
    <div className='flex items-center justify-center border h-screen'>
      <div className='font-bold text-xl font-serif text-cyan-800'>Loading.........</div>
    </div>
  );
}
