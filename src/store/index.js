import { createStore } from 'vuex';

export default createStore({
  state: {
    invoiceModal: false,
  },
  mutations: {
    toggleInvoiceModal(state) {
      state.invoiceModal = !state.invoiceModal;
    },
  },
  actions: {},
  modules: {},
});
