import React from "react";
import '../../pages/login/login.css';
import Loginn from "../../component/loginn";

const LoginPage = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 full-bg-color">
        <div className="d-flex justify-content-center align-items-center login-outer bg-color" style={{width:"60%",minHeight:"400px"}}>
          <Loginn />
        </div>
      </div>
    </>
  );
};

export default LoginPage;