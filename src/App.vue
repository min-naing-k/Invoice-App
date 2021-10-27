<template>
  <div v-if="!mobile" class="app flex flex-column">
    <Navigation />
    <div class="app-content flex flex-column">
      <Modal v-show="modalActive" />
      <transition name="invoiceModal">
        <InvoiceModal v-if="invoiceModal" />
      </transition>
      <router-view />
    </div>
  </div>
  <div v-else class="mobile-message flex flex-column">
    <h2>Sorry, this app is not supported on the Mobile Screen.</h2>
    <p>If you want to use, please use desktop and tablet.</p>
  </div>
</template>

<script>
import Modal from "./components/Modal";
import InvoiceModal from "./components/InvoiceModal";
import Navigation from "./components/Navigation";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Modal,
    InvoiceModal,
    Navigation,
  },
  setup() {
    const store = useStore();
    const mobile = ref(null);
    const checkScreen = () => {
      if (window.innerWidth <= 750) return (mobile.value = true);

      return (mobile.value = false);
    };

    window.addEventListener("resize", checkScreen);
    window.addEventListener("load", checkScreen);

    const invoiceModal = computed(() => store.state.invoiceModal);
    const modalActive = computed(() => store.state.modalActive);

    return {
      mobile,
      invoiceModal,
      modalActive,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>