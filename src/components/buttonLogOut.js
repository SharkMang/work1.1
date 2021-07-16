import React from "react";

export default class ButtonLogout extends React.Component {
  render() {
    return (
      <div>
        <button className='loginLogoutBtn' 
          onClick={() => {
            localStorage.setItem('isAuthenticated', false);
            window.location.reload();
          }}>
            Logout
        </button>
      </div>
    )
  }
}