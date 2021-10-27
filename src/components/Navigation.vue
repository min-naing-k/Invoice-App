<template>
  <header class="flex">
    <div class="branding flex">
      <img
        src="@/assets/file-invoice-dollar-solid.png"
        alt="file-invoice-dollar-solid"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  background-color: #1e2139;
  // desktop and laptop
  @media (min-width: 900px) {
    width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    @media (min-width: 900px) {
      width: 100%;
    }

    img {
      width: auto;
      height: 30px;
    }
  }
}
</style>