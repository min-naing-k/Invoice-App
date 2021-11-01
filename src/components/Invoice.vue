<template>
  <div>
    <router-link
      class="invoice flex"
      :to="{ name: 'invoiceDetail', params: { id: invoice.id } }"
    >
      <div class="notification" v-if="!invoice.isReading"></div>
      <div class="left flex">
        <span class="tracking-number">
          #{{ invoice.invoiceId }}
          <p class="time-ago">{{ invoice.timeAgo }}</p>
        </span>
        <span class="due-date">{{ invoice.paymentDueDate }}</span>
        <span class="person">{{ invoice.clientName }}</span>
      </div>
      <div class="right flex">
        <span class="price">${{ invoice.invoiceTotal }}</span>
        <div
          class="status-button flex"
          :class="{
            paid: invoice.invoicePaid,
            draft: invoice.invoiceDraft,
            pending: invoice.invoicePending,
          }"
        >
          <span v-if="invoice.invoicePaid">Paid</span>
          <span v-if="invoice.invoiceDraft">Draft</span>
          <span v-if="invoice.invoicePending">Pending</span>
        </div>
        <div class="icon">
          <img src="@/assets/icon-arrow-right.svg" alt="" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["invoice"],
};
</script>


<style lang="scss" scoped>
.invoice {
  position: relative;
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  .notification {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }

  span {
    font-size: 13px;
  }
  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
    span {
      flex: 1;
    }
    .tracking-number {
      text-transform: uppercase;
      position: relative;

      .time-ago {
        position: absolute;
        top: 1.3rem;
        font-size: 0.675rem;
        text-transform: lowercase;
        color: hsl(0, 0, 65%);
      }
    }
  }
  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>