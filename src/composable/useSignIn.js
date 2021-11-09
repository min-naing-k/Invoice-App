import { uid } from 'uid';
import { ref } from 'vue';
import { auth, provider, db } from '../firebase/config';

const useSignIn = () => {
  const error = ref(null);

  const signIn = async (email, password) => {
    try {
      if (!email || !password)
        throw new Error("Email and Password can't be empty!");

      const cred = await auth.signInWithEmailAndPassword(email, password);

      if (!cred) {
        throw new Error('Oops! SignIn Fail. Try Again');
      }

      return cred;
    } catch (e) {
      error.value = e.message;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const cred = await auth.signInWithPopup(provider);
      if (!cred) {
        throw new Error('No Credential Found');
      }
      const user = cred.user;

      const doc = await db
        .collection('users')
        .doc(user.uid)
        .get();

      if (doc.exists) {
        return cred;
      }

      await db
        .collection('users')
        .doc(user.uid)
        .set({
          id: user.uid,
          userID: uid(6),
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          address: null,
          phone: null,
        });
      return cred;
    } catch (e) {
      error.value = e.message;
    }
  };

  return {
    error,
    signIn,
    signInWithGoogle,
  };
};

export default useSignIn;
