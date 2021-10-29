<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "modal",
  setup() {
    const store = useStore();

    const closeInvoice = () => {
      document.querySelector(".invoice-wrap").style.pointerEvents = "none";
      const editModal = computed(() => store.state.editModal);
      if (editModal.value) {
        store.commit("toggleEditModal");
      }
      store.commit("toggleInvoiceModal");
      store.commit("toggleModal");
    };

    const closeModal = () => {
      store.commit("toggleModal");
    };

    return {
      closeInvoice,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>