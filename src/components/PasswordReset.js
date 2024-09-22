import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';
import './theme-06.css'; // Ensure the path is correct and the file exists
import  mailicon from '../assets/images/icon-envelope.svg';
import  logo  from '../assets/images/logo-06.svg';

const PasswordReset = () => {
  return (
    <div className="forny-container">
      <div className="forny-inner">
        <div className="forny-two-pane">
          <div>
            <div className="forny-form">
              <div className="reset-form d-block">
                <form className="reset-password-form">
                  <h4 className="mb-5">Reset Your password</h4>
                  <p className="mb-10">
                    Please enter your email address and we will send you a password reset link.
                  </p>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                        <img src={mailicon} alt="Icon Description" />

                        </span>
                      </div>
                      <input
                        required
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button className="btn btn-primary btn-block">Send Reset Link</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="reset-confirmation d-none">
                <h4 className="mb-5">Link was sent</h4>
                <div>
                  Please, check your inbox for a password reset link.
                </div>
              </div>
            </div>
          </div>
          <div className="right-pane">
            <div className="text-center" style={{ width: '300px', marginTop: '-140px' }}>
              <div className="mb-10 forny-logo">
                <img src={logo} alt="Forny Logo" />
              </div>
              <div className="mt-8">
                <h4 className="mb-4">Welcome to <br />Forny.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;