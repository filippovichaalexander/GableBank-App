<template>
  <div class="form-inner">
    <!-- <h1>SignIn component</h1> -->
    <!-- Start Signup Form -->
    <form action="#" class="signup">
      <div class="field">

          <input type="text" placeholder="First Name" required>

      </div>
      <div class="field">

          <input type="text" placeholder="Last Name" required>

      </div>
      <div class="field">

          <input type="text" placeholder="Username" required>

      </div>
      <div class="field">
          <input type="text" placeholder="Email Address" required>
      </div>
      <div class="field">
          <input type="password" placeholder="Password" required>
      </div>
      <div class="field">
          <input type="password" placeholder="Confirm password" required>
      </div>
      <div class="field">

          <input type="text" placeholder="Coupon code" required>

      </div>
      <div class="field">

          <input type="text" placeholder="Refferal ID" required>

      </div>

      <div class="field">
          <input type="submit" value="Signup">
      </div>
    </form>
  </div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
.form-inner {
  width: 100%;
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