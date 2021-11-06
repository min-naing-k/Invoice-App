<template>
  <div class="edit-profile">
    <Navigation />
    <form @submit.prevent="handleUpdateProfile" class="container">
      <div class="left">
        <div class="top">
          <div
            @click="$refs.fileInput.click"
            class="img-wrapper"
            :class="{ removeBorderColor: previewImg }"
          >
            <input
              @change="fileUpload"
              type="file"
              hidden
              ref="fileInput"
              accept="image/png,jpeg,jpg"
            />
            <div class="photograph-wrapper">
              <img
                src="@/assets/photograph.png"
                alt="photograph"
                class="photograph"
              />
            </div>
            <img
              src="@/assets/user.png"
              alt="user"
              class="user"
              :class="{ hide: previewImg }"
            />
            <img
              v-if="previewImg"
              :src="previewImg"
              alt="preview"
              class="preview"
            />
          </div>
          <div class="user-id">
            <p>@hgie123</p>
          </div>
        </div>
        <div class="bottom">
          <button @click="clear" class="btn-cancel" type="button">
            Cancel
          </button>
          <button class="btn-save" type="submit">Save Changes</button>
        </div>
      </div>
      <div class="right">
        <div class="information">
          <div class="information-left">
            <h2>Account Data</h2>
            <div class="form-wrapper">
              <label for="name">Name</label>
              <input
                type="text"
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
          </div>
          <div class="information-right">
            <h2>Personal Data</h2>
            <div class="form-wrapper">
              <label for="phone">Phone</label>
              <input
                type="text"
                id="phone"
                class="form-control"
                autocomplete="off"
                placeholder="Enter Your Phone..."
              />
            </div>
            <div class="form-wrapper">
              <label for="address">address</label>
              <input
                type="text"
                id="address"
                class="form-control"
                autocomplete="off"
                placeholder="Enter Your Address..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Navigation from "./Navigation";
export default {
  components: { Navigation },
  props: ["id"],
  setup() {
    const state = reactive({
      previewImg: null,
    });

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

    const clear = () => {
      state.previewImg = null;
    };

    return {
      ...toRefs(state),
      fileUpload,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-profile {
  color: #f2f2f2;
  min-height: 100vh;
  margin-left: 90px;

  @media (max-width: 900px) {
    margin-left: unset;
  }

  .container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1100px;

    @media (max-width: 900px) {
      padding: 0 1rem;
    }

    .left {
      margin-top: 5rem;
      .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #1e2139;
        padding: 2rem 1rem;
        border-radius: 1rem;

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

        .removeBorderColor {
          border-color: transparent;
        }

        .hide {
          display: none;
        }

        .user-id {
          margin-top: 1rem;
        }
      }

      .bottom {
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          border-radius: 0.375rem;
          margin: unset;
          color: #333;
        }

        .btn-cancel {
          background-color: transparent;
          color: #f2f2f2;
          border: 2px solid #cccccc9d;
        }

        .btn-save {
          background-color: #7c5dfa;
          color: #f2f2f2;

          &:hover {
            background-color: #5e43ca;
          }
        }
      }
    }

    .right {
      margin-top: 5rem;
      background-color: #1e2139;
      padding: 2rem;
      border-radius: 1rem;

      .information {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .information-left,
        .information-right {
          h2 {
            margin-bottom: 1rem;
          }
        }

        .form-wrapper {
          margin-bottom: 1rem;

          label {
            display: block;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
          }

          .form-control {
            width: 100%;
            padding: 1rem 0.8rem;
            background-color: transparent;
            color: #f2f2f2;
            border-radius: 0.375rem;
            border: none;
            border: 1px solid #31355a;

            &:focus {
              outline: none;
              border-color: #7c5dfa;
            }
          }
        }
      }
    }
  }
}
</style>