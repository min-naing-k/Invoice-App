<template>
  <div v-if="!appLoaded">
    <div v-if="!mobile" class="app flex flex-column">
      <div class="app-content flex flex-column">
        <transition name="modal">
          <Modal v-show="modalActive" />
        </transition>
        <transition name="invoiceModal">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <router-view v-slot="{ Component }">
          <transition :name="isAnimation" mode="out-in" appear>
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on the Mobile Screen.</h2>
      <p>If you want to use, please use desktop and tablet.</p>
    </div>
  </div>
  <div v-else class="app-loaded">
    <div class="spinner"></div>
  </div>
</template>

<script>
import Modal from "./components/Modal";
import InvoiceModal from "./components/InvoiceModal";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Modal,
    InvoiceModal,
  },
  setup() {
    const store = useStore();
    const mobile = ref(null);
    const appLoaded = computed(() => store.state.appLoaded);
    const invoiceModal = computed(() => store.state.invoiceModal);
    const modalActive = computed(() => store.state.modalActive);
    const isAnimation = computed(() => {
      if (store.state.isAnimation) {
        return "route";
      }

      return "";
    });

    const checkScreen = () => {
      if (window.innerWidth <= 750) return (mobile.value = true);

      return (mobile.value = false);
    };

    window.addEventListener("resize", checkScreen);
    window.addEventListener("load", checkScreen);

    /**
     * ? Get all invoices
     */
    store.dispatch("getInvoices");

    return {
      mobile,
      invoiceModal,
      modalActive,
      appLoaded,
      isAnimation,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-loaded {
  background-color: #141625;
  color: #f2f2f2;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 60px;
    height: 60px;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #545b96;
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

/**
* ? Invoice Modal Animation
*/
.invoiceModal-enter-from,
.invoiceModal-leave-to {
  left: -100%;
}

.invoiceModal-enter-active {
  transition: all 0.8s ease-out;
}

.invoiceModal-leave-active {
  transition: all 0.8s ease-in;
}

/**
* ? Modal Animation
*/
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

/**
* ? Route Animation
*/
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>