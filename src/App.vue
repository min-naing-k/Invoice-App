<template>
  <div v-if="!appLoaded">
    <div v-if="!mobile" class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <transition name="modal">
          <Modal v-show="modalActive" />
        </transition>
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
  </div>
  <div v-else class="app-loaded">Loading Data.....</div>
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
    const appLoaded = computed(() => store.state.appLoaded);
    const invoiceModal = computed(() => store.state.invoiceModal);
    const modalActive = computed(() => store.state.modalActive);

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
}
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
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}
</style>