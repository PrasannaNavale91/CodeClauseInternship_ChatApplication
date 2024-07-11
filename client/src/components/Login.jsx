import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  };

  const handleToggle = () =>{
    setShow(!show)
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100'>
        <h1 className='text-3xl text-white font-bold text-center py-4'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className='py-4'>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Username' />
          </div>
          <div className='flex items-center justify-between py-4'>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input h-10 p-4'
              type={show ? "text" : "password"}
              placeholder='Password' />
            <span onClick={handleToggle} className='ml-[-30px] text-lg cursor-pointer'>{show ? <FiEyeOff /> : <FiEye /> }</span>
          </div>
          <p className='text-center my-2'>Don't have an account? <Link to="/signup"> signup </Link></p>
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 text-white bg-[#00a884] border-0 hover:bg-[#008069]'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login