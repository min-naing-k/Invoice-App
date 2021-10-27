import { createStore } from 'vuex';
import { db } from '../firebase/config';

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: false,
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
      // console.log(state.invoiceData);
    },
  },
  actions: {
    getInvoices({ commit, state }) {
      db.collection('invoices')
        .orderBy('created_at')
        .onSnapshot((snap) => {
          const result = [];
          snap.docs.forEach((doc) => {
            // dont allow duplicate data
            // some() return true or false
            if (!state.invoiceData.some((invoice) => invoice.id === doc.id)) {
              const document = { ...doc.data(), id: doc.id };
              doc.data().created_at && result.push(document);
            }
          });
          commit('updateInvoiceData', result);
        });
    },
  },
  modules: {},
});
