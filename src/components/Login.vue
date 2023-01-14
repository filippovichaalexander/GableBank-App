<template>
  <div class="form-inner">
    <!-- <h1>LogIn component</h1> -->
    <!-- Start Login Form -->
    <form action="#" class="login">
      <div class="field">
          <input type="text" placeholder="Email Address" required>
      </div>
      <div class="field">
          <input type="password" placeholder="Password" required>
      </div>
      <div class="pass-link">
          <a href="#">
          Forgot password?
          </a>
      </div>
      <div class="field">
          <input type="submit" value="Login">
      </div>
      <div class="signup-link">
          Not a member? <a href="#">Signup now</a>
      </div>
    </form> 
  </div>
    
    
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.form-inner {
  width: 100%;
}
.form-inner form {
  width: 100%;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-inner form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
}

.form-inner form .field input {
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 15px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
}
.form-inner form .field input:focus {
  border-color: #fc83bb;
}
.form-inner form .pass-link {
  margin-top: 5px;
}
.form-inner form .pass-link a,
.form-inner form .signup-link a {
  color: #fa4299;
  text-decoration: none;
}

.form-inner form .signup-link {
  text-align: center;
  margin-top: 30px;
}

.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover {
  text-decoration: underline;
}
form .field input[type="submit"] {
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  padding-left: 0px;
  border: none;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
}
.router-link-active {
  background-color: red;
}
  </style>