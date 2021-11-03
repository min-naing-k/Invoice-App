<template>
  <div class="register">
    <form @submit.prevent="submitRegister" class="form">
      <h3>Register</h3>
      <!-- <div
        @click="$refs.fileInput.click"
        class="img-wrapper"
        :class="{ removeBorderColor: previewImg }"
      >
        <input
          @change="fileUpload"
          type="file"
          hidden
          ref="fileInput"
          accept="image/*"
        />
        <div class="photograph-wrapper">
          <img
            src="@/assets/photograph.png"
            alt="photograph"
            class="photograph"
          />
        </div>
        <img src="@/assets/user.png" alt="user" class="user" />
        <img
          v-if="previewImg"
          :src="previewImg"
          alt="preview"
          class="preview"
        />
      </div> -->
      <div class="form-wrapper">
        <label for="name">Name</label>
        <input
          type="name"
          id="name"
          class="form-control"
          autocomplete="off"
          placeholder="Enter Your Name..."
        />
      </div>
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
        <input type="submit" value="Register" class="btn-submit" />
      </div>
      <p class="text">
        Already a Member ? Please
        <span @click="$emit('register', true)">login</span>
      </p>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      previewImg: null,
    });

    const submitRegister = () => {
      alert("hi");
    };

    const fileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          state.previewImg = reader.result;
        });
        reader.readAsDataURL(file);
      }
    };

    return {
      ...toRefs(state),
      submitRegister,
      fileUpload,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  padding: 2rem 2.5rem;
  border-radius: 0.875rem;
  background-color: #1e2139;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  max-width: 450px;
  width: 100%;

  .removeBorderColor {
    border-color: transparent !important;
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

  .img-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px dashed #31355af3;
    border-radius: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .photograph-wrapper {
      position: absolute;
      right: -0.3rem;
      bottom: -0.3rem;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      .photograph {
        width: auto;
        height: 15px;
      }
    }

    .user {
      width: 60%;
      height: 60%;
    }

    .preview {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
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
    display: block;
    width: 100%;
    border: 1px solid #31355a85;
    padding: 0.5rem 1.5rem;
    border-radius: 0.375rem;
    background-color: transparent;
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