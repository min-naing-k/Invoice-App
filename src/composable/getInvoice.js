import { db } from '../firebase/config';
import { ref } from 'vue';
/**
 * * Find Specific Invoice Item
 * @param string invoice's id
 * @return invoice and error and load
 */
const getInvoice = (id) => {
  const error = ref(null);
  const invoice = ref(null);

  const load = async () => {
    try {
      const doc = await db
        .collection('invoices')
        .doc(id)
        .get();
      if (doc.data()) {
        invoice.value = { id: doc.id, ...doc.data() };
      } else {
        error.value = 'no invoice';
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return { error, invoice, load };
};

export default getInvoice;
