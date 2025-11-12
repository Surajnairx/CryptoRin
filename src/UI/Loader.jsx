function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-cyan-300 rounded-full border-b-transparent animate-spin" />
      <span className="ml-3">Searching...</span>
    </div>
  );
}

export default Loader;
