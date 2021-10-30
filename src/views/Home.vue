<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>
          There are {{ invoices.length }} total
          {{ invoices.length > 1 ? "invoices" : "invoice" }}
        </span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex dropdown">
          <span class="dropdown">Filter by status {{ filterStatus }}</span>
          <img
            src="@/assets/icon-arrow-down.svg"
            alt="icon-arrow-down"
            class="dropdown"
          />
          <transition name="dropdown">
            <ul v-show="filterMenu" class="filter-menu">
              <li @click="filterByStatus('Draft')">Draft</li>
              <li @click="filterByStatus('Pending')">Pending</li>
              <li @click="filterByStatus('Paid')">Paid</li>
              <li @click="filterByStatus('')">Clear Filter</li>
            </ul>
          </transition>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="icon-plus" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>

    <!-- Invoices -->
    <div v-if="invoices.length">
      <Invoice
        v-for="invoice in invoices"
        :key="invoice.id"
        :invoice="invoice"
      />
    </div>

    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="empty" />
      <h3>There is nothing here</h3>
      <p>
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div>
  </div>
</template>

<script>
import Invoice from "../components/Invoice";
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: {
    Invoice,
  },
  setup() {
    const store = useStore();
    const filterMenu = ref(false);
    const filterStatus = ref(null);
    const invoices = ref([]);
    const computedInvoiceData = reactive({
      invoices: computed(() => store.state.invoiceData),
    });

    invoices.value = computedInvoiceData.invoices;

    const toggleFilterMenu = () => {
      filterMenu.value = !filterMenu.value;
    };

    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("dropdown") && filterMenu.value) {
        filterMenu.value = false;
      }
    });

    const newInvoice = () => {
      const editModal = computed(() => store.state.editModal);
      if (editModal.value) {
        store.commit("toggleEditModal");
      }
      store.commit("toggleInvoiceModal");
    };

    const filterByStatus = (status) => {
      if (!status) {
        filterStatus.value = status;
        invoices.value = computedInvoiceData.invoices;
        return;
      }
      filterStatus.value = `: ${status}`;
      switch (status) {
        case "Draft":
          invoices.value = computedInvoiceData.invoices.filter(
            (invoice) => invoice.invoiceDraft === true
          );
          break;
        case "Paid":
          invoices.value = computedInvoiceData.invoices.filter(
            (invoice) => invoice.invoicePaid === true
          );
          break;
        case "Pending":
          invoices.value = computedInvoiceData.invoices.filter(
            (invoice) => invoice.invoicePending === true
          );
          break;
      }
    };

    return {
      invoices,
      toggleFilterMenu,
      filterMenu,
      newInvoice,
      filterByStatus,
      filterStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        cursor: pointer;
        user-select: none;
        position: relative;
        margin-right: 40px;
        z-index: 97;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px
            rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;
        cursor: pointer;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;

          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
}

.empty {
  margin-top: 100px;
  align-items: center;
  img {
    width: 214px;
    height: 200px;
  }
  h3 {
    font-size: 20px;
    margin-top: 40px;
  }
  p {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}

.dropdown-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dropdown-enter-active {
  transition: all 0.1s ease-out;
}

.dropdown-leave-active {
  transition: all 0.1s ease-in;
}
</style>