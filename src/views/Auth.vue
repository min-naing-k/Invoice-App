<template>
  <div class="auth flex">
    <Login v-if="isLogin" @login="isLogin = $event" />
    <Register v-else @register="isLogin = $event" />
  </div>
</template>

<script>
import Register from "../components/Register";
import Login from "../components/Login";
import { reactive, toRefs } from "vue";

export default {
  components: {
    Register,
    Login,
  },
  setup() {
    const state = reactive({
      isLogin: true,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.auth {
  color: #f2f2f2;
  margin-left: 90px;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    margin-left: unset;
  }
}
</style>