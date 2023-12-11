/* eslint-disable */
import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
const LOGIN_URL = 'auth/login';
function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: {
        email,
        password: pwd,
      },
    };
    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        Accept: '*/*',
      });
      const authToken = res.headers.authorization;
      const { role } = res.data.data;
      const username = res.data.data.name;
      const { id } = res.data.data;
      setAuth({
        role,
        authToken,
        email,
        username,
        id,
      });
      localStorage.setItem(
        'Token',
        JSON.stringify({ authToken, username, id, role }),
      );
      setEmail('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="rounded-1 login-register-style">
      <p
        ref={errRef}
        className={errMsg ? 'errMsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="register-content">
        <h1 className="header">Sign In</h1>
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            ref={userRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            placeholder="Email"
            required
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            autoComplete="on"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn-color text-light">
            Sign In
          </button>
        </form>
        <p className="sign-in-p">
          Need an Account?
          <br />
          <Link to="/register" className="text-light go-sign">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
export default Login;