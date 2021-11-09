import { ref } from 'vue';
import { auth } from '../firebase/config';

const authService = () => {
  const authError = ref(null);

  /**
   * ? Reset User Password
   */
  const resetPassword = async (email) => {
    try {
      if (!email) throw new Error("Email Can't be empty!");

      await auth.sendPasswordResetEmail(email, {
        url: 'http://localhost:8080/',
      });

      return 'success';
    } catch (e) {
      authError.value = e.message;
    }
  };

  /**
   * ? Update User Password
   */
  const updatePassword = async (newPassword, confirmPassword) => {
    try {
      if (newPassword < 6 || confirmPassword < 6) {
        throw new Error('Password must be at least 6 characters');
      } else if (newPassword !== confirmPassword) {
        throw new Error("Confirm Password doesn't match");
      }
      await auth.currentUser.updatePassword(newPassword);
    } catch (e) {
      authError.value = e.message;
    }
  };

  return {
    authError,
    resetPassword,
    updatePassword,
  };
};

export default authService;
