import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  };

  const handleToggle = () =>{
    setShow(!show)
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100'>
        <h1 className='text-3xl font-bold text-white text-center py-4'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className='py-4'>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Full Name' />
          </div>
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
          <div className='flex items-center justify-between py-4'>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10'
              type={show ? "text" : "password"}
              placeholder='Confirm Password' />
            <span onClick={handleToggle} className='ml-[-30px] text-lg cursor-pointer'>{show ? <FiEyeOff /> : <FiEye /> }</span>
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2" />
            </div>
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 text-white bg-[#00a884] border-0 hover:bg-[#008069]'>Singup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup