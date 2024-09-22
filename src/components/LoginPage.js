import React,{useState} from 'react';
//import './LoginPage.css'; // Adjust the path as needed///
import { useNavigate } from 'react-router-dom';
import  mailicon from '../assets/images/icon-envelope.svg';
import  fbimg  from '../assets/images/icon-facebook-v2.svg';
import  passicon  from '../assets/images/icon-eye.svg';
import  goggleicon  from '../assets/images/icon-google-v2.svg';
import  twittericon  from '../assets/images/icon-twitter-v2.svg';
import  usericon  from '../assets/images/icon-user.svg';
import  lockicon  from '../assets/images/icon-lock.svg';
import  picicon  from '../assets/images/SVStackLogo.png';
import PasswordReset from './PasswordReset';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate('/reset');
  };
  
  return (
    <div className="forny-container">
      <div className="forny-inner">
        <div className="forny-two-pane">
          <div>
            <div className="forny-form">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'login' ? 'active bg-transparent' : 'bg-transparent'}`}
                    onClick={() => handleTabChange('login')} 
                    href="#login" data-toggle="tab" role="tab">
                    <span>Login</span>
                  </a>
                </li>
                <li className="nav-item">
                <a
                    className={`nav-link ${activeTab === 'register' ? 'active bg-transparent' : 'bg-transparent'}`}
                    onClick={() => handleTabChange('register')}
                    href="#register"
                    role="tab"
                  >
                    <span>Register</span>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}
                role="tabpanel" id="login">
                  <p className="mt-6 mb-6">Use your credentials to login into the account.</p>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                          <img src={mailicon} alt="Icon Description" /></span>
                        </div>
                        <input
                          required
                          className="form-control"
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group password-field">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                          <img src={lockicon} alt="Icon Description" /></span>
                        </div>
                        <input
                          required
                          className="form-control"
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="input-group-append cursor-pointer">
                          <span className="input-group-text">
                          <img src={passicon} alt="Passwordicon" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-primary btn-block">Login</button>
                      </div>
                      <div className="col-6 d-flex align-items-center justify-content-end">
                      <a href="#" onClick={handleForgotPasswordClick} className="btn btn-link">
                            Forgot password?
                          </a>
                      </div>
                    </div>

                    <div className="pt-10 pb-4">
                      Or login with
                      <div className="d-inline-block ml-4">
                        <button className="btn btn-icon btn-flat text-facebook">
                          <img src={fbimg} alt="Facebook" />
                        </button>

                        <button className="btn btn-icon btn-flat text-google">
                          <img src={goggleicon} alt="Google" />
                        </button>

                        <button className="btn btn-icon btn-flat text-twitter">
                          <img src={twittericon} alt="Twitter" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}
                role="tabpanel" id="register">
                  <p className="mt-6 mb-6">Enter your information to set up a new account.</p>
                  <form>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                          <img src={usericon} alt="Icon Description" />
                          </span>
                        </div>
                        <input
                          required
                          className="form-control"
                          name="username"
                          type="text"
                          placeholder="Username"
                        />
                      </div>
                    </div>

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
                  <div className="form-group password-field">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                        <img src={lockicon} alt="Icon Description" />
                        </span>
                      </div>
                      <input required className="form-control" name="password" type="password" placeholder="Password" />
                      <div className="input-group-append cursor-pointer">
                        <span className="input-group-text">
                        <img src={passicon} alt="Icon Description" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block">Register</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="forny-picture">
    <div 
    className="text-center" 
     style={{ width: '200px', marginTop: '-200px' }} // Correctly formatted inline styles
  >
    <div className="mb-4 forny-logo">
      <img src={picicon} alt="logo" />
    </div>
    <div className="mt-8">
      {/* <h4 className="mb-4">Makes life easy <br/>SV Stack</h4> */}
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;







