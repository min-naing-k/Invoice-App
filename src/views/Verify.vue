<template>
  <div class="verify">
    <p>
      Please Verify Your Email. Check Your Email <br />
      <a href="https://www.gmail.com" target="_blank">{{ user.email }}</a>
    </p>
    <div class="btn-wrapper">
      <router-link :to="{ name: 'Auth' }" class="back purple">
        Back
      </router-link>
    </div>
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import getUser from "../composable/getUser";
export default {
  setup() {
    const router = useRouter();
    const { user } = getUser();

    watch(user, () => {
      router.push({ name: "Home" });
    });

    return {
      user,
    };
  },
};
</script>

<style lang="scss">
.verify {
  min-height: 100vh;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    margin-top: 10rem;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.7;

    a {
      color: #8585e7;
      text-decoration: underline;
    }
  }

  .btn-wrapper a {
    display: inline-block;
    margin-top: 1.2rem;
    margin-right: 1rem;
    padding: 1rem 1.5rem;
    text-decoration: none;
    font-size: 0.775rem;
    color: #fff;
    border-radius: 50rem;
  }
}
</style>