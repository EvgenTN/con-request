<template>
  <form class="form" @submit.prevent="sendData">
    <div class="form-div" v-for="(item, i) in formRender" :key="i">
      <span class="form-span">{{ item.name }}</span>
      <component
        :is="item.type"
        :model="item.model"
        :inputType="item.inputType"
        :selectOptions="item.selectOptions"
        @changeval="changeValue($event, item.keyName)"
      ></component>
    </div>
    <button type="submit" class="btn">Отправить заявку</button>
  </form>
</template>

<script>
import InputElement from "@/components/InputElement";
import SelectElement from "@/components/SelectElement";
import TextareaElement from "@/components/TextareaElement";
import { mapGetters } from "vuex";

export default {
  name: "user_form",
  components: {
    InputElement,
    SelectElement,
    TextareaElement
  },
  computed: {
    ...mapGetters({
      selectedAddress: "selectedAddress"
    }),
    rightAddress() {
      let addr
      if (this.selectedAddress) {
        addr = [
          this.selectedAddress.city,
          this.selectedAddress.road,
          this.selectedAddress.house_number
        ];
      }
      return addr
    },
    formControls() { return {
        address: this.rightAddress,
        flat: "",
        userName: "",
        connectionDate: null,
        tel: null,
        currentProvider: null,
        floor: null,
        portNum: null,
        comment: ""
      }},
    formRender() {
      return [
        {
          name: "Адрес:",
          model: this.formControls.address,
          keyName: "address",
          type: InputElement,
          inputType: "text"
        },
        {
          name: "Квартира:",
          model: this.formControls.flat,
          keyName: "flat",
          type: InputElement,
          inputType: "number"
        },
        {
          name: "Ваше ФИО:",
          model: this.formControls.userName,
          keyName: "userName",
          type: InputElement,
          inputType: "text"
        },
        {
          name: "Желаемая дата и время подключения:",
          model: this.formControls.connectionDate,
          keyName: "connectionDate",
          type: InputElement,
          inputType: "datetime"
        },
        {
          name: "Телефон:",
          model: this.formControls.tel,
          keyName: "tel",
          type: InputElement,
          inputType: "tel"
        },
        {
          name: "Ваш текущий провайдер:",
          model: this.formControls.currentProvider,
          keyName: "currentProvider",
          type: SelectElement,
          selectOptions: ["first", "second"]
        },
        {
          name: "Этаж:",
          model: this.formControls.floor,
          keyName: "floor",
          type: InputElement,
          inputType: "number"
        },
        {
          name: "Номер порта:",
          model: this.formControls.portNum,
          keyName: "portNum",
          type: InputElement,
          inputType: "number"
        },
        {
          name: "Примечание:",
          model: this.formControls.comment,
          keyName: "comment",
          type: TextareaElement
        }
      ];
    }
  },
  methods: {
    sendData() {
      console.log("address", this.formControls);
    },
    changeValue(e, key) {
      this.formControls[key] = e.target.value;
      // console.log('address', this.address);
      // console.log('item', Object.keys(this.$data))
    }
  }
};
</script>

<style lang="scss" scoped>
// .form {

// }
.form-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}
.form-span {
  flex: 1;
  text-align: end;
  margin: 3px;
  padding: 2px;
  background: #e2dddd;
  font-weight: bold;
}
.form-input {
  flex: 1;
  margin: 3px;
  padding: 2px;
}
.btn {
  background: linear-gradient(to top, #ff3c00, #f17928);
  color: white;
  margin: 20px 5px;
  padding: 7px 20px;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #ff3c00;
  &:active {
    background: linear-gradient(to top, #c03004, #a06a19);
  }
}
</style>
