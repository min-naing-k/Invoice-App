import { createStore } from 'vuex';
import { db } from '../firebase/config';

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: false,
    invoiceLoading: true,
    modalActive: false,
  },
  mutations: {
    toggleInvoiceModal(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    toggleModal(state) {
      state.modalActive = !state.modalActive;
    },
    updateInvoiceData(state, result) {
      state.invoiceData = result;
      state.invoiceLoading = false;
    },
  },
  actions: {
    getInvoices({ commit }) {
      db.collection('invoices')
        .orderBy('created_at', 'desc')
        .onSnapshot((snap) => {
          const result = [];
          snap.docs.forEach((doc) => {
            const document = { ...doc.data(), id: doc.id };
            doc.data().created_at && result.push(document);
          });
          commit('updateInvoiceData', result);
        });
    },
  },
  modules: {},
});
