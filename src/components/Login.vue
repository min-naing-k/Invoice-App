<template>
  <div class="login">
    <form @submit.prevent="submitLogin" class="form">
      <h3>Log In</h3>
      <div class="form-wrapper">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          autocomplete="off"
          placeholder="Enter Your Email..."
        />
      </div>
      <div class="form-wrapper">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter Your Password..."
        />
      </div>
      <div class="btn-wrapper">
        <input type="submit" value="Login" class="btn-submit" />
        <button @click="signInGoogle" type="button" class="btn-google">
          <img src="@/assets/google.png" alt="google" class="google" />
          Sign Up With Google
        </button>
      </div>
      <p class="text">
        Not a Member ? Please
        <span @click="$emit('register', false)">Register</span>
      </p>
    </form>
  </div>
</template>

<script>
import useSignIn from "../composable/useSignIn";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const { error, signInWithGoogle } = useSignIn();

    const submitLogin = () => {
      alert("hi");
    };

    const signInGoogle = async () => {
      store.commit("updateAppLoaded"); // appLoaded = true
      const cred = await signInWithGoogle();
      if (!cred) {
        store.commit("updateAppLoaded"); // appLoaded = false
        return;
      }

      store.commit("updateAppLoaded");
      router.push({ name: "Home" });
    };

    if (error.value) {
      console.log(error.value);
    }

    return {
      submitLogin,
      signInGoogle,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 2rem 2.5rem;
  border-radius: 0.875rem;
  background-color: #1e2139;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  max-width: 450px;
  width: 100%;

  h3 {
    position: relative;
    font-size: 1.875rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 6%;
      height: 3px;
      background: linear-gradient(to right, #aa96f8, #7c5dfa);
      border-radius: 1rem;
    }
  }

  .form-wrapper {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 0.875rem;
      margin-bottom: 0.3rem;
    }

    .form-control {
      padding: 0.8rem;
      border-radius: 0.375rem;
      border: none;
      border: 2px solid #31355a;
      background-color: transparent;
      color: #f2f2f2;
      width: 100%;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #7c5dfa;
      }
    }
  }

  .btn-submit {
    display: block;
    width: 100%;
    padding: 0.5rem 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    background-color: #7c5dfa;
    color: #f2f2f2;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      background-color: #6146cc;
    }
  }

  .btn-google {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #31355a85;
    padding: 0.5rem 1.5rem;
    border-radius: 0.375rem;
    background-color: transparent;

    .google {
      width: 15px;
      height: 15px;
      margin-right: 0.5rem;
    }
  }

  .text {
    margin-top: 1rem;
    font-size: 0.775rem;
    color: #ccccccbe;

    span {
      text-decoration: underline;
      color: #7c5dfa;
      cursor: pointer;
    }
  }
}
</style>