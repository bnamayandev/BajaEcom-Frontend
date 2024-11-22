import React from 'react'
import { useNavigate } from 'react-router-dom'

const Account = ({ handleLogout, goToMembersView, token }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Account</div>
      <button>asdf</button>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Signup</button>
          </div>
        )}
        <button onClick={goToMembersView}>Members' View</button>
      </div>
    </div>
  )
}

export default Account