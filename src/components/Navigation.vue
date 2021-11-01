<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/invoice.png" alt="file-invoice-dollar-solid" />
    </div>
    <div class="setting flex">
      <img
        @click="toggleSetting"
        id="setting"
        src="@/assets/setting.png"
        alt="setting"
      />
      <transition name="settingDropdown">
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
  </header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "navigation",
  setup() {
    const store = useStore();
    const toggleSettingDropdown = ref(null);
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

    return {
      toggleSetting,
      toggleSettingDropdown,
      toggleAnimation,
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

  .setting {
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 1rem;

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

/**
* ? Animation
*/

.settingDropdown-enter-from,
.settingDropdown-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.settingDropdown-enter-active {
  transition: all 0.1s ease-out;
}

.settingDropdown-leave-active {
  transition: all 0.1s ease-in;
}
</style>