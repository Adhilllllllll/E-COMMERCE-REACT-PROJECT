// import React from "react";

// export default function LogoutButton() {
//   return <div>Logout</div>;
// }
export default function LogoutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
    
    >
      Logout
    </button>
  );
}