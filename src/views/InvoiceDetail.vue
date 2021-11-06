<template>
  <div>
    <Navigation />
    <div v-if="invoice">
      <div class="invoice-view container">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
          <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
        </router-link>
        <!-- Header -->
        <div class="header flex">
          <div class="left flex">
            <span>Status</span>
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
          </div>
          <div class="right flex">
            <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
            <button @click="deleteInvoice(invoice.id)" class="red">
              Delete
            </button>
            <button
              @click="updateStatusToPaid(invoice.id)"
              v-if="invoice.invoicePending"
              class="green"
            >
              Mark as Paid
            </button>
            <button
              v-if="invoice.invoiceDraft || invoice.invoicePaid"
              @click="updateStatusToPending(invoice.id)"
              class="orange"
            >
              Mark as Pending
            </button>
          </div>
        </div>
        <!-- Invoice Details -->
        <div class="invoice-details flex flex-column">
          <div class="top flex">
            <div class="left flex flex-column">
              <p><span>#</span>{{ invoice.invoiceId }}</p>
              <p>{{ invoice.productDescription }}</p>
            </div>
            <div class="right flex flex-column">
              <p>{{ invoice.billerStreetAddress }}</p>
              <p>{{ invoice.billerCity }}</p>
              <p>{{ invoice.billerZipCode }}</p>
              <p>{{ invoice.billerCountry }}</p>
            </div>
          </div>
          <div class="middle flex">
            <div class="payment flex flex-column">
              <h4>Invoice Date</h4>
              <p>
                {{ invoice.invoiceDate }}
              </p>
              <h4>Payment Date</h4>
              <p>
                {{ invoice.paymentDueDate }}
              </p>
            </div>
            <div class="bill flex flex-column">
              <h4>Bill To</h4>
              <p>{{ invoice.clientName }}</p>
              <p>{{ invoice.clientStreetAddress }}</p>
              <p>{{ invoice.clientCity }}</p>
              <p>{{ invoice.clientZipCode }}</p>
              <p>{{ invoice.clientCountry }}</p>
            </div>
            <div class="send-to flex flex-column">
              <h4>Sent To</h4>
              <p>{{ invoice.clientEmail }}</p>
            </div>
          </div>
          <div class="bottom flex flex-column">
            <div class="billing-items">
              <div class="heading flex">
                <p>Item Name</p>
                <p>QTY</p>
                <p>Price</p>
                <p>Total</p>
              </div>
              <div
                v-for="(item, index) in invoice.invoiceItemList"
                :key="index"
                class="item flex"
              >
                <p>{{ item.itemName }}</p>
                <p>{{ item.qty }}</p>
                <p>{{ item.price }}</p>
                <p>{{ item.total }}</p>
              </div>
            </div>
            <div class="total flex">
              <p>Amount Due</p>
              <p>{{ invoice.invoiceTotal }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="error-wrapper">
      <p class="container error">Oops! Sorry No Invoice Here...</p>
      <router-link class="button" :to="{ name: 'Home' }">
        Back To Home
      </router-link>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import { computed } from "vue";
import { useStore } from "vuex";
import { db } from "../firebase/config";
import { useRouter } from "vue-router";

export default {
  components: { Navigation },
  props: ["id"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const invoice = computed(() => store.state.invoiceDetail[0]);

    store.commit("getInvoice", props.id);

    /**
     * * Edit Invoice
     */
    const toggleEditInvoice = () => {
      store.commit("toggleEditModal");
      store.commit("toggleInvoiceModal");
    };

    /**
     * * Delete Invoice
     */
    const deleteInvoice = async (id) => {
      await db.collection("invoices").doc(id).delete();
      router.push({ name: "Home" });
    };

    /**
     * * Mark As Paid
     */
    const updateStatusToPaid = async (id) => {
      await db.collection("invoices").doc(id).update({
        invoicePaid: true,
        invoicePending: null,
      });
      store.commit("getInvoice", props.id);
    };
    /**
     * * Mark As Pending
     */
    const updateStatusToPending = async (id) => {
      await db.collection("invoices").doc(id).update({
        invoicePending: true,
        invoicePaid: null,
        invoiceDraft: null,
      });
      store.commit("getInvoice", props.id);
    };

    /**
     * * isReading
     */
    const updateIsReading = async () => {
      await db.collection("invoices").doc(props.id).update({
        isReading: true,
      });
    };

    if (invoice.value && !invoice.value.isReading) {
      updateIsReading();
    }

    return {
      invoice,
      toggleEditInvoice,
      deleteInvoice,
      updateStatusToPaid,
      updateStatusToPending,
    };
  },
};
</script>


<style lang="scss" scoped>
.invoice-view {
  padding-left: 20px;
  padding-right: 20px;

  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
.error-wrapper {
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