<template>
  <div class="verify">
    <p style="color: #fff">Please Verify Your Email. Check Your Email.</p>
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

    watch(user.value.emailVerified, () => {
      router.push({ name: "Home" });
    });
  },
};
</script>

<style>
</style>