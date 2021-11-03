import { createStore } from 'vuex';
import { db } from '../firebase/config';

export default createStore({
  state: {
    appLoaded: true,
    invoiceData: [],
    invoiceModal: null,
    invoiceDetail: [],
    modalActive: false,
    editModal: null,
    isAnimation: true,
  },
  mutations: {
    updateAppLoaded(state) {
      state.appLoaded = !state.appLoaded;
    },
    toggleInvoiceModal(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    toggleModal(state) {
      state.modalActive = !state.modalActive;
    },
    toggleEditModal(state) {
      state.editModal = !state.editModal;
    },
    toggleAnimation(state) {
      state.isAnimation = !state.isAnimation;
    },
    updateInvoiceData(state, result) {
      state.invoiceData = result;
    },
    getInvoice(state, id) {
      state.invoiceDetail = state.invoiceData.filter((invoice) => {
        return invoice.id === id;
      });
    },
    deleteInvoice(state, id) {
      state.invoiceData = state.invoiceData.filter(
        (invoice) => invoice.id !== id,
      );
    },
  },
  actions: {
    getInvoices({ commit }) {
      db.collection('invoices')
        .orderBy('created_at', 'desc')
        .onSnapshot((snap) => {
          const invoices = [];
          snap.docs.forEach((doc) => {
            const document = { ...doc.data(), id: doc.id };
            doc.data().created_at && invoices.push(document);
          });
          commit('updateInvoiceData', invoices);
          commit('updateAppLoaded');
        });
    },
  },
});
