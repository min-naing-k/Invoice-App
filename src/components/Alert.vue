<template>
  <div class="alert">
    <div
      class="error"
      :class="{
        green: messageType === 'success',
        red: messageType === 'error',
      }"
    >
      <div class="img">
        <img
          v-if="messageType === 'success'"
          src="@/assets/success.png"
          alt="error"
        />
        <img
          v-if="messageType === 'warning'"
          src="@/assets/warning.png"
          alt="error"
        />
        <img
          v-if="messageType === 'error'"
          src="@/assets/error-message.png"
          alt="error"
        />
      </div>
      <span>
        <slot></slot>
      </span>
      <div class="cross">
        <svg
          @click="closeAlert"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          class="svg-inline--fa fa-times fa-w-11"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["messageType"],
  setup(props, ctx) {
    const closeAlert = () => {
      ctx.emit("updateMessageType", null);
    };

    return {
      closeAlert,
    };
  },
};
</script>

<style lang="scss">
.alert {
  .error {
    font-size: 0.785rem;
    margin-bottom: 1rem;
    border-radius: 0.375rem;
    display: flex;
    overflow: hidden;

    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem;

      img {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
    }

    span {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0.8rem;
    }

    .cross {
      display: flex;
      align-items: center;
      padding: 0.8rem;

      svg {
        width: 0.975rem;
        height: 0.975rem;
        cursor: pointer;
        color: #bebebe;
      }
    }
  }
  .red {
    background-color: #b64141;
    .img {
      background-color: #9e2b2b;
    }
  }

  .green {
    background-color: #52c277;
    .img {
      background-color: #24a163;
    }

    span,
    .cross svg {
      color: #fff;
    }
  }
}
</style>