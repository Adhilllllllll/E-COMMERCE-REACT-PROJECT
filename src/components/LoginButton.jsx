const LoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm uppercase tracking-wider text-gray-600 hover:text-black"
    >
      Login
    </button>
  );
};

export default LoginButton;
