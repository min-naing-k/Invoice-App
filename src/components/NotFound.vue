<template>
  <div class="not-found">
    <h3>404 Not Found</h3>
    <p class="container error">Oops! This route doesn't exist...</p>
    <router-link class="button" :to="{ name: 'Home' }">
      Back To Home
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;

  .error {
    font-size: 1.5rem;
    color: #f2f2f2;
    text-align: center;
    margin-top: 2rem;
  }
  .button {
    text-decoration: none !important;
    background-color: #252945;
  }
}
</style>