import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';
import PasswordModal from '../components/PasswordModal';

const Account = ({ handleLogout, token }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoToMembersView = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPassword = () => {
    setIsModalOpen(false);
    navigate('/orderdashboard');
  };

  return (
    <div className="account-container">
      <h1 className="account-title">Account</h1>
      <div className="button-container">
        {token ? (
          <>
            <button className="button primary-button" onClick={() => navigate('/my-orders')}>
              My Orders
            </button>
            <button className="button danger-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="button primary-button" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="button secondary-button" onClick={() => navigate('/signup')}>
              Signup
            </button>
          </>
        )}
        <button className="button primary-button" onClick={handleGoToMembersView}>
          Staff View
        </button>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPassword}
      />
    </div>
  );
};

export default Account;
