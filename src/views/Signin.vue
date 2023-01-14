<template>
  <div class="wrapper">
  <div class="title-text">
    <div class="title login">Login Form</div>
    <div class="title signup">Signup Form</div>
  </div>

  <!-- Start Form Container -->
  <div class="form-container">
    <div class="slide-controls">
      <input type="radio" name="slider" id="login" checked >
      <input type="radio" name="slider" id="signup">
      <label for="login" class="slide login" @click="isShowed = 'login'">Login</label>
      <label for="signup" class="slide signup" @click="isShowed = 'signin'"> Signup</label>
      <div class="slide-tab"></div>
    </div>

    <div class="form-inner">

      <!-- Start Login Form -->
      <form action="#" class="login" :class="{ showlogin: isShowed === 'signin' }">
        <div class="field">
          <input type="text" placeholder="Email Address" v-model="loginEmail" required>
        </div>
        <div class="field">
          <input type="password" placeholder="Password" v-model="loginPassword" required>
        </div>
        <div class="pass-link">
          <p v-if="signInError" :class="{ loginErrorShow: signInError }" class="login__error"> Неверное сочетание логина и пароля</p>
          <a v-else href="#">
            Forgot password?
          </a>
        </div>
        <div class="field">
          <input type="submit" value="Login" @click="signIn($event)">
        </div>
        <div class="signup-link">
          Not a member? <a href="#">Signup now</a>
        </div>
      </form>

      <!-- Start Signup Form -->
      <form action="#" class="signup">
        <div class="field">
          <input type="text" placeholder="First Name" v-model="firstName" required>
        </div>
        <div class="field">
          <input type="text" placeholder="Last Name" v-model="lastName" required >
        </div>
        <div class="field">
          <input type="text" placeholder="Email Address" v-model="email" required>
        </div>
        <div class="field">
          <input type="password" placeholder="Password" v-model="password" required>
        </div>
        <div class="field">
          <input type="password" placeholder="Confirm password" v-model="confirmPassword" required>
        </div>

        <div class="field">
          <input type="submit" value="Signup" @click="signUp($event)">
        </div>

      </form>
    </div>
  </div>
</div>
</template>



<script>
export default {
  data() {
    return { 
      firstName: '',
      lastName:'',
      email: '',
      password: '',
      confirmPassword: '',
      isShowed: 'login',

      loginEmail: '',
      loginPassword: '',

      signInError: false
     }
  },
  name: "Signin",
  methods: {
    showSignInError() {
      return this.signInError = true
    },
    signUp(event) {
      event.preventDefault();
      if(this.password === this.confirmPassword) {
        let user = {
          login: this.email,
          password: this.password,
          name: this.firstName,
          secondname : this.lastName
        }
        this.$store.dispatch('singUp', user)
        .then(data => console.log(data))
        this.$router.push('/');
      };
      this.firstName= '';
      this.lastName='';
      this.email= '';
      this.password= '';
      this.confirmPassword= '';
    },
    signIn(event) {
      event.preventDefault();
      let loginUser = {
        login: this.loginEmail,   //login и password это конкретные названия переменных которые должны совпадать с перем. backend
        password: this.loginPassword,
      }
      this.$store.dispatch('signIn', loginUser).then(data => {
        if(data){
          this.$router.push('/');  
        }
        else{
          // alert("Неверное сочетание логина и пароля")
          this.showSignInError();            //  как лучше ?
          // this.signInError = true;       //  как лучше ?              
        }
      })
    },  
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html,
body {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
}

.wrapper {
  margin: 0 auto;
  max-width: 390px;
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.wrapper .title-text {
  display: flex;
  width: 200%;
}

.wrapper .title-text .title {
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .form-container {
  width: 100%;
  overflow: hidden;
}

.form-container .slide-controls {
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
}

.slide-controls .slide {
  color: #fff;
  height: 100%;
  width: 100%;
  z-index: 1;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  transition: all 0.6s ease;
}

.slide-controls .signup {
  color: #000;
}

.slide-controls .slide-tab {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  border-radius: 5px;
  z-index: 0;
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
  transition: all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
input[type="radio"] {
  display: none;
}

#signup:checked ~ .slide-tab {
  left: 50%;
}

#signup:checked ~ .signup {
  color: #fff;
}

#signup:checked ~ .login {
  color: #000;
}

.form-container .form-inner {
  display: flex;
  width: 200%;
}

.form-container .form-inner form {
  width: 50%;
  transition: all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
.showlogin {
  margin-left: -50%;
}
.login__error {
  /* position: absolute; */
  color: #fa4299;
  /* left: -200px; */
  /* transition: all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55); */
}
/* .loginErrorShow {
  left: 0;
} */

</style>
