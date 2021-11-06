<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/invoice.png" alt="file-invoice-dollar-solid" />
    </div>
    <div class="bottom">
      <div v-if="user" class="profile-wrapper">
        <img
          @click="profileMenu = !profileMenu"
          :src="user.photoURL"
          alt="profile"
        />
        <transition name="dropdown">
          <div v-if="profileMenu" class="profile-menu-dropdown">
            <router-link
              :to="{ name: 'EditProfile', params: { id: user.uid } }"
              class="edit-profile"
            >
              Edit Profile
            </router-link>
            <button @click="handleSignOut" type="button" class="btn-sign-out">
              Sign Out
            </button>
          </div>
        </transition>
      </div>
      <div class="setting flex">
        <img
          @click="toggleSetting"
          id="setting"
          src="@/assets/setting.png"
          alt="setting"
        />
        <transition name="dropdown">
          <div
            v-show="toggleSettingDropdown"
            class="setting-dropdown-menu setting-dropdown"
          >
            <label class="setting-dropdown">Reduce Animation</label>
            <span class="custom-checkbox-wrapper flex">
              <input
                type="checkbox"
                class="setting-dropdown"
                @click="toggleAnimation"
              />
              <div class="custom-checkbox setting-dropdown"></div>
            </span>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useSignOut from "../composable/useSignOut";
import getUser from "../composable/getUser";

export default {
  name: "navigation",
  setup() {
    const store = useStore();
    const router = useRouter();
    const profileMenu = ref(null);
    const toggleSettingDropdown = ref(null);

    const { user } = getUser();

    const toggleSetting = () => {
      toggleSettingDropdown.value = !toggleSettingDropdown.value;
    };

    document.documentElement.addEventListener("click", (e) => {
      if (
        toggleSettingDropdown.value &&
        e.target.id !== "setting" &&
        !e.target.classList.contains("setting-dropdown")
      ) {
        toggleSetting();
      }
    });

    const toggleAnimation = () => {
      store.commit("toggleAnimation");
    };

    const { error, signOut } = useSignOut();

    const handleSignOut = async () => {
      store.commit("toggleShowNav");
      await signOut();
      router.push({ name: "Auth" });
    };

    if (error.value) {
      console.log(error.value);
    }

    return {
      toggleSetting,
      toggleSettingDropdown,
      toggleAnimation,
      handleSignOut,
      user,
      profileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  background-color: #1e2139;
  justify-content: space-between;

  // desktop and laptop
  @media (min-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 90px;
    height: 100vh;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    @media (min-width: 900px) {
      width: 100%;
    }

    img {
      width: auto;
      height: 40px;
    }
  }

  .bottom {
    display: flex;

    @media (min-width: 900px) {
      flex-direction: column;
    }

    .profile-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;

      @media (min-width: 900px) {
        margin-bottom: 1.5rem;
        margin-right: unset;
      }

      img {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }

      .profile-menu-dropdown {
        position: absolute;
        top: -7rem;
        left: 2rem;
        background-color: #2e3257;
        color: #fff;
        padding: 1rem;
        white-space: nowrap;
        border-radius: 1rem;
        box-shadow: 0 5px 15px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media (max-width: 900px) {
          top: 1rem;
          left: -8.5rem;
        }

        .edit-profile {
          font-size: 0.875rem;
          color: #fff;
          text-decoration: none;
          margin-bottom: 1rem;
        }

        .btn-sign-out {
          display: block;
          background-color: #7c5dfa;
          border-radius: 0.375rem;
          padding: 0.5rem 1rem;
          margin-right: unset;
        }
      }
    }

    .setting {
      position: relative;
      justify-content: center;
      align-items: center;
      padding: 1rem;

      @media (min-width: 900px) {
        flex-direction: column;
      }

      button {
        background-color: unset;
        padding: 1rem;
        border-radius: unset;
      }

      img {
        width: auto;
        height: 20px;
        cursor: pointer;
      }

      .setting-dropdown-menu {
        position: absolute;
        top: -3.5rem;
        left: 2rem;
        background-color: #2e3257;
        color: #fff;
        padding: 1rem;
        white-space: nowrap;
        border-radius: 1rem;
        box-shadow: 0 5px 15px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;

        @media (max-width: 900px) {
          top: 1rem;
          left: -12.5rem;
        }

        label {
          font-size: 0.875rem;
          margin-right: 0.5rem;
        }

        .custom-checkbox-wrapper {
          position: relative;

          input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 100;
          }

          .custom-checkbox {
            position: relative;
            display: inline-block;
            width: 35px;
            height: 20px;
            background-color: #f2f2f2;
            border-radius: 5rem;
            cursor: pointer;
            transition: all 0.3s ease;

            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: #2e3257;
              transform: scale(0.9);
              transition: all 0.3s ease;
            }
          }

          input:checked ~ .custom-checkbox::before {
            left: 0.975rem;
            background-color: #f2f2f2;
          }
          input:checked ~ .custom-checkbox {
            background-color: #1e2139;
          }
        }
      }
    }
  }
}

/**
* ? Animation
*/

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dropdown-enter-active {
  transition: all 0.1s ease-out;
}

.dropdown-leave-active {
  transition: all 0.1s ease-in;
}
</style>