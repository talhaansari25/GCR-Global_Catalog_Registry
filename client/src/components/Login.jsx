import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'smtelectronics@gmail.com',
    password: 'Sumeet@123',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login data:', formData);

    try {
      const response = await fetch("https://gcrneuratechserver.vercel.app/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // alert("Login successful!");
        // console.log("Response Data: ", data);

        //save in local storage
        await localStorage.setItem("sid", data.seller._id);
        navigate('/shop');

      } else {
        alert('Error: ${data.message}');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    // <div className="register">
    //   <div className="register-container">
    //     <h2>Login</h2>
    //     <form onSubmit={handleSubmit} className="register-form">
    //       <div>
    //         <label>Email</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>
    //       <button type="submit">Login</button>
    //     </form>
    //   </div>
    // </div>

    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-submit-btn">Login</button>
        <br />
        <br />
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
          <hr style={{ width: '40%' , height:'1px'}} />
          <p>&nbsp; OR &nbsp;</p>
          <hr style={{ width: '40%', height:'1px' }} />
        </div><br />
        <button onClick={()=>{
         navigate("/register")
        }} className="login-submit-btn-outline">Sign Up</button>
      </form>

      <button onClick={()=>{
         navigate("/home")
        }} className="login-submit-btn-outline">Buyer</button>
    </div>

  );
};

export default Login;