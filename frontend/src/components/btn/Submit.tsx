export default function Submit() {
  return (
    <button
      disabled
      type="submit"
      className="cursor-not-allowed max-w-lg text-white bg-[#e07c39] hover:bg-[#e07c39] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Validate
      <i className="ms-2 fa-sharp fa-solid fa-spinner fa-spin"></i>
    </button>
  );
}
