const LogoutButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm uppercase tracking-wider text-gray-600 hover:text-black"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
