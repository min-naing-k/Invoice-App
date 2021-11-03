import { ref } from 'vue';
import { auth } from '../firebase/config';

const user = ref(auth.currentUser);

auth.onAuthStateChanged((_user) => {
  user.value = _user;
});

export default () => {
  return { user };
};
