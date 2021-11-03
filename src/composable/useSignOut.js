import { ref } from 'vue';
import { auth } from '../firebase/config';

const useSignOut = () => {
  const error = ref(null);

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log('use sign out successfully');
    } catch (e) {
      error.value = e.message;
    }
  };

  return {
    error,
    signOut,
  };
};

export default useSignOut;
