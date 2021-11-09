<template>
  <div class="edit-profile">
    <Navigation />
    <div class="wrapper container">
      <router-link class="back" :to="{ name: 'Home' }">
        <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
      </router-link>
      <form v-if="user" @submit.prevent="handleUpdateProfile" class="container">
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
                :src="user.image"
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
              <p>@{{ user.userID }}</p>
            </div>
          </div>
          <div class="bottom">
            <button @click="clear" class="btn-cancel" type="button">
              Cancel
            </button>
            <button class="btn-save" type="submit">
              <span v-if="btnLoading" class="spinner"></span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </div>
        <div class="right">
          <Alert
            v-if="messageType"
            :messageType="messageType"
            @updateMessageType="messageType = $event"
          >
            {{ message }}
          </Alert>
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
                  v-model="user.name"
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
                  v-model="user.email"
                  disabled
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
                  v-model="user.phone"
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
                  v-model="user.address"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from "./Alert";
import { reactive, toRefs } from "vue";
import Navigation from "./Navigation";
import { db, storage } from "../firebase/config";

export default {
  components: {
    Alert,
    Navigation,
  },
  props: ["id"],
  setup(props) {
    const state = reactive({
      previewImg: null,
      user: null,
      image: null,
      messageType: null,
      message: null,
      progress: null,
      error: null,
      btnLoading: null,
    });

    /**
     * ? Get The User From Firebase
     */
    db.collection("users")
      .doc(props.id)
      .onSnapshot((snap) => {
        state.user = snap.data();
      });

    const fileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        state.image = file;
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

    const handleUpdateProfile = async () => {
      state.btnLoading = true;
      if (state.image) {
        const storageRef = storage.ref(`images/profile/${state.image.name}`);
        storageRef.put(state.image).on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            // state.progress = percentage;
            console.log(percentage + "%");
          },
          (err) => {
            state.error = err;
            console.log(state.error);
            state.messageType = "error";
            state.message = "Oops!Sorry Cant Update. Try Again";
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            await db.collection("users").doc(props.id).update({
              name: state.user.name,
              image: url,
              address: state.user.address,
              phone: state.user.phone,
            });
            state.btnLoading = false;
            state.messageType = "success";
            state.message = "Save Profile Detail Successfully!";
          }
        );
      } else {
        await db.collection("users").doc(props.id).update({
          name: state.user.name,
          address: state.user.address,
          phone: state.user.phone,
        });
        state.btnLoading = false;
        state.messageType = "success";
        state.message = "Save Profile Detail Successfully!";
      }
    };

    return {
      ...toRefs(state),
      fileUpload,
      clear,
      handleUpdateProfile,
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

  .wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;

    .back {
      display: inline-block;
      margin-bottom: 1rem;
      color: #fff;
      text-decoration: none;
      font-size: 0.875rem;

      img {
        margin-right: 0.5rem;
      }
    }

    .container {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
      padding: 0;

      @media (max-width: 900px) {
        padding: 0 1rem;
      }

      .left {
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
              right: -0.6rem;
              bottom: -0.6rem;
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
              width: 110%;
              height: 110%;
              object-fit: cover;
              object-position: center;
              border-radius: 1rem;
            }

            .preview {
              position: absolute;
              width: 110%;
              height: 110%;
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
            border: 2px solid transparent;
            width: 9rem;
            height: 3.4rem;

            &:hover {
              background-color: #5e43ca;
            }

            .spinner {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid transparent;
              border-top-color: #fff;
              animation: spinner 1s linear infinite;
            }
            @keyframes spinner {
              to {
                transform: rotate(360deg);
              }
            }
          }
        }
      }

      .right {
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

  .container {
    max-width: 1100px;
  }
}
</style>