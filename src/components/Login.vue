<template>
  <div class="login">
    <form @submit.prevent="submitLogin" class="form">
      <h3>Log In</h3>
      <div v-if="error" class="error">
        <div class="img">
          <img src="@/assets/error-message.png" alt="error" />
        </div>
        <span>{{ error }}</span>
      </div>
      <div class="form-wrapper">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          autocomplete="off"
          placeholder="Enter Your Email..."
          required
          v-model="email"
        />
      </div>
      <div class="form-wrapper">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter Your Password..."
          required
          v-model="password"
        />
      </div>
      <div>
        <div class="btn-wrapper">
          <div v-if="btnLoading" class="btn-loading">
            <span></span>
          </div>
          <input v-else type="submit" value="Login" class="btn-submit" />
        </div>
        <div class="btn-google-wrapper">
          <div v-if="btnGoogleLoading" class="btn-google-loading">
            <span></span>
          </div>
          <button v-else @click="signInGoogle" type="button" class="btn-google">
            <img src="@/assets/google.png" alt="google" class="google" />
            Sign In With Google
          </button>
        </div>
      </div>
      <p class="text">
        Not a Member ? Please
        <span @click="$emit('login', false)">Register</span>
      </p>
    </form>
  </div>
</template>

<script>
import useSignIn from "../composable/useSignIn";
import { useRouter } from "vue-router";
import { reactive, ref, toRefs } from "vue";

export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      email: null,
      password: null,
    });
    const btnLoading = ref(null);
    const btnGoogleLoading = ref(null);
    const { error, signIn, signInWithGoogle } = useSignIn();

    const submitLogin = async () => {
      btnLoading.value = true;
      const cred = await signIn(state.email, state.password);
      btnLoading.value = false;
      if (cred) {
        router.push({ name: "Home" });
      }
    };

    const signInGoogle = async () => {
      btnGoogleLoading.value = true;
      const cred = await signInWithGoogle();
      btnGoogleLoading.value = false;
      if (cred) {
        router.push({ name: "Home" });
      }
    };

    return {
      ...toRefs(state),
      submitLogin,
      signInGoogle,
      btnLoading,
      btnGoogleLoading,
      error,
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

  .error {
    font-size: 0.785rem;
    margin-bottom: 1rem;
    background-color: #b64141;
    border-radius: 0.375rem;
    display: flex;
    overflow: hidden;

    .img {
      background-color: #9e2b2b;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem;

      img {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
    }

    span {
      display: flex;
      align-items: center;
      padding: 0.8rem;
    }
  }

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

  .btn-wrapper {
    margin-bottom: 1rem;
    background-color: #7c5dfa;
    border-radius: 0.375rem;
    height: 40px;

    .btn-loading {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: not-allowed;

      span {
        width: 25px;
        height: 25px;
        border: 2px solid transparent;
        border-top-color: #fff;
        border-radius: 50%;
        animation: spinner 1s linear infinite;
      }

      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }

    .btn-submit {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 0.875rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      background-color: transparent;
      color: #f2f2f2;
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        background-color: #6146cc;
      }
    }
  }

  .btn-google-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    background-color: transparent;
    border-radius: 0.375rem;
    height: 40px;
    border: 1px solid #31355a85;

    .btn-google-loading {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: not-allowed;

      span {
        width: 25px;
        height: 25px;
        border: 2px solid transparent;
        border-top-color: #fff;
        border-radius: 50%;
        animation: spinner 1s linear infinite;
      }

      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }

    .btn-google {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-radius: 0.375rem;
      background-color: transparent;

      .google {
        width: 15px;
        height: 15px;
        margin-right: 0.5rem;
      }
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