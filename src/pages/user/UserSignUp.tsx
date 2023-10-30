import { useState } from 'react';
import OtpInput from '../../components/common/OtpInput';
import NavBar from '../../components/user/NavBar';
import SignUp from '../../components/user/SignUp';
import ReactDOM from 'react-dom';

const Backdrop: React.FC = () => {
  return <div className="fixed top-0 left-0 w-full h-screen z-10 bg-black bg-opacity-75" />;
};

const UserSignUp: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const otpHandler = () => {
    setShowOtp(!showOtp);
  };
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
};
  return (
    <>
      <NavBar color={!isScrolled} fixed />
      <div className="relative z-0">
        <SignUp otpSubmit={otpHandler} />
      </div>
      {showOtp && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById('backdrop-root') as HTMLElement
          )}
          {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
              <div className="modal p-4">
                <button className="modal-close" onClick={() => setShowOtp(false)}>
                  Close OTP
                </button>
                <OtpInput userType="user" closeOtp={otpHandler}/>
              </div>
            </div>,
            document.getElementById('modal-root') as HTMLElement
          )}
        </>
      )}
    </>
  );
};

export default UserSignUp;
