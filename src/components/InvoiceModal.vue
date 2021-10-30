<template>
  <div
    @click.self="checkClick"
    ref="invoiceWrap"
    class="invoice-wrap flex flex-column"
  >
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="isLoading" />
      <h1 v-if="!editModal">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>
      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <h4>Bill Form</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="billerZipCode"
              v-model="billerZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">County</label>
            <input
              required
              type="text"
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="clientZipCode"
              v-model="clientZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">County</label>
            <input
              required
              type="text"
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select v-model="paymentTerms" id="paymentTerms">
            <option value="" disabled>Choose Something</option>
            <option value="30">Next 30 Days</option>
            <option value="60">Next 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>
        <div class="work-item">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr
              v-for="(item, index) in invoiceItemList"
              :key="index"
              class="table-items flex"
            >
              <td class="item-name">
                <input type="text" v-model="item.itemName" />
              </td>
              <td class="qty">
                <input type="number" v-model="item.qty" />
              </td>
              <td class="price">
                <input type="number" v-model="item.price" />
              </td>
              <td class="total">${{ (item.total = item.qty * item.price) }}</td>
              <img
                @click="deleteInvoiceItem(item.id)"
                src="@/assets/icon-delete.svg"
                alt=""
                style="cursor: pointer"
              />
            </tr>
          </table>
          <div @click="addNewInvoiceItem" class="button flex">
            <img src="@/assets/icon-plus.svg" alt="icon-plus" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeInvoice" class="red">
            Cancel
          </button>
        </div>
        <div class="right flex">
          <button
            v-if="!editModal"
            type="submit"
            @click="saveDraft"
            class="dark-purple"
          >
            Save Draft
          </button>
          <button
            v-if="!editModal"
            type="submit"
            @click="publishInvoice"
            class="purple"
          >
            Create Invoice
          </button>
          <button
            v-if="editModal"
            type="submit"
            @click="updateInvoice"
            class="purple"
          >
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Loading from "./Loading";
import { computed, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { uid } from "uid";
import { timestamp } from "../firebase/config";
import useCollection from "../composable/useCollection";
import { db } from "../firebase/config";
export default {
  components: { Loading },
  name: "invoiceModal",
  setup() {
    const store = useStore();
    const state = reactive({
      dateOption: { year: "numeric", month: "short", day: "numeric" },
      isLoading: false,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: "",
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
      error: null,
    });
    const editModal = computed(() => store.state.editModal);
    const currentInvoice = computed(() => store.state.invoiceDetail[0]);

    if (editModal.value) {
      state.billerStreetAddress = currentInvoice.value.billerStreetAddress;
      state.billerCity = currentInvoice.value.billerCity;
      state.billerZipCode = currentInvoice.value.billerZipCode;
      state.billerCountry = currentInvoice.value.billerCountry;
      state.clientName = currentInvoice.value.clientName;
      state.clientEmail = currentInvoice.value.clientEmail;
      state.clientStreetAddress = currentInvoice.value.clientStreetAddress;
      state.clientCity = currentInvoice.value.clientCity;
      state.clientZipCode = currentInvoice.value.clientZipCode;
      state.clientCountry = currentInvoice.value.clientCountry;
      state.invoiceDateUnix = currentInvoice.value.invoiceDateUnix;
      state.invoiceDate = currentInvoice.value.invoiceDate;
      state.paymentTerms = currentInvoice.value.paymentTerms;
      state.paymentDueDateUnix = currentInvoice.value.paymentDueDateUnix;
      state.paymentDueDate = currentInvoice.value.paymentDueDate;
      state.productDescription = currentInvoice.value.productDescription;
      state.invoicePending = currentInvoice.value.invoicePending;
      state.invoiceDraft = currentInvoice.value.invoiceDraft;
      state.invoiceItemList = currentInvoice.value.invoiceItemList;
    }

    const checkClick = () => {
      store.commit("toggleModal");
    };

    const closeInvoice = () => {
      if (editModal.value) {
        store.commit("toggleEditModal");
      }
      store.commit("toggleInvoiceModal");
    };

    /**
     * ? get current date for invoice date field
     */
    if (!editModal.value) {
      state.invoiceDateUnix = Date.now();
      state.invoiceDate = new Date(state.invoiceDateUnix).toLocaleDateString(
        "en-us",
        state.dateOption
      );
    }

    /**
     * ? get the future date for payment due date
     */
    watch(
      () => state.paymentTerms,
      () => {
        const futureDate = new Date();
        state.paymentDueDateUnix = futureDate.setDate(
          futureDate.getDate() + parseInt(state.paymentTerms)
        );
        state.paymentDueDate = new Date(
          state.paymentDueDateUnix
        ).toLocaleDateString("en-us", state.dateOption);
      }
    );

    /**
     * ? Add Item
     */
    const addNewInvoiceItem = () => {
      state.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    };

    /**
     * ? Delete Items
     * @param string item's id
     */
    const deleteInvoiceItem = (id) => {
      state.invoiceItemList = state.invoiceItemList.filter(
        (item) => item.id !== id
      );
    };

    /**
     * ? Calculate Total Price of Items
     * @return total number
     */
    const calInvoiceTotal = () => {
      state.invoiceTotal = state.invoiceItemList.reduce((total, item) => {
        return total + item.total;
      }, 0);
    };

    const saveDraft = () => {
      state.invoiceDraft = true;
    };

    const publishInvoice = () => {
      state.invoicePending = true;
    };

    const uploadInvoice = async () => {
      if (state.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items");
        return;
      }

      state.isLoading = true;
      document.querySelector(".invoice-wrap").style.pointerEvents = "none";

      calInvoiceTotal();

      const doc = {
        invoiceId: uid(6),
        created_at: timestamp(), // timestamp() waits for a little bit of time
        billerStreetAddress: state.billerStreetAddress,
        billerCity: state.billerCity,
        billerZipCode: state.billerZipCode,
        billerCountry: state.billerCountry,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientStreetAddress: state.clientStreetAddress,
        clientCity: state.clientCity,
        clientZipCode: state.clientZipCode,
        clientCountry: state.clientCountry,
        invoiceDateUnix: state.invoiceDateUnix,
        invoiceDate: state.invoiceDate,
        paymentTerms: state.paymentTerms,
        paymentDueDateUnix: state.paymentDueDateUnix,
        paymentDueDate: state.paymentDueDate,
        productDescription: state.productDescription,
        invoicePending: state.invoicePending,
        invoiceDraft: state.invoiceDraft,
        invoicePaid: null,
        invoiceItemList: state.invoiceItemList,
        invoiceTotal: state.invoiceTotal,
      };

      const { error, addDoc } = useCollection("invoices");

      await addDoc(doc);

      state.isLoading = false;

      if (error.value) {
        state.error = error.value;
        console.log(state.error);
      }

      store.commit("toggleInvoiceModal");
    };

    const updateInvoice = async () => {
      if (state.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items");
        return;
      }
      state.isLoading = true;
      document.querySelector(".invoice-wrap").style.pointerEvents = "none";
      calInvoiceTotal();
      const updateInvoice = {
        billerStreetAddress: state.billerStreetAddress,
        billerCity: state.billerCity,
        billerZipCode: state.billerZipCode,
        billerCountry: state.billerCountry,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientStreetAddress: state.clientStreetAddress,
        clientCity: state.clientCity,
        clientZipCode: state.clientZipCode,
        clientCountry: state.clientCountry,
        invoiceDateUnix: state.invoiceDateUnix,
        invoiceDate: state.invoiceDate,
        paymentTerms: state.paymentTerms,
        paymentDueDateUnix: state.paymentDueDateUnix,
        paymentDueDate: state.paymentDueDate,
        productDescription: state.productDescription,
        invoicePending: state.invoicePending,
        invoiceDraft: state.invoiceDraft,
        invoiceItemList: state.invoiceItemList,
        invoiceTotal: state.invoiceTotal,
      };
      const database = db.collection("invoices").doc(currentInvoice.value.id);
      await database.update(updateInvoice);
      state.isLoading = false;
      store.commit("getInvoice", currentInvoice.value.id);
      store.commit("toggleInvoiceModal");
      store.commit("toggleEditModal");
    };

    const submitForm = () => {
      if (!editModal.value) {
        uploadInvoice();
        return;
      }

      updateInvoice();
    };

    return {
      ...toRefs(state),
      checkClick,
      closeInvoice,
      addNewInvoiceItem,
      deleteInvoiceItem,
      saveDraft,
      publishInvoice,
      submitForm,
      editModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none; // For FireFox
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 98;
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 76px 56px 56px 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 900px) {
      padding: 56px;
    }

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    // Invoice work
    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-item {
        .item-list {
          width: 100%;

          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    // Save/Exit
    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>