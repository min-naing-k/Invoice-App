import { uid } from 'uid';
import { ref } from 'vue';
import { auth, db, storage } from '../firebase/config';

const useSignUp = () => {
  const error = ref(null);

  const signUp = async (name, email, password) => {
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      if (!cred) {
        throw new Error('Fail to SignUp');
      }

      const user = cred.user;

      await user.sendEmailVerification({
        url: 'http://localhost:8080/home',
      });

      const storageRef = storage.ref();
      const url = await storageRef
        .child('images/profile/user.png')
        .getDownloadURL();

      await user.updateProfile({ displayName: name, photoURL: url });

      await db
        .collection('users')
        .doc(user.uid)
        .set({
          id: user.uid,
          userID: uid(6),
          name: user.displayName,
          email: user.email,
          address: null,
          image: url,
          phone: null,
        });

      return cred;
    } catch (e) {
      error.value = e.message;
    }
  };

  return { error, signUp };
};

export default useSignUp;
