// generate (err) and generate (fun) that exports data to the firebase
import { ref } from 'vue';
import { db } from '../firebase/config';
const useCollection = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    try {
      await db.collection(collection).add(doc);
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, addDoc };
};

export default useCollection;
