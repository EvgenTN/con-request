<template>
  <form class="form" @submit.prevent="sendData">
    <div class="form-div" v-for="(item, i) in formRender" :key="i">
      <span class="form-span">{{ item.name }}</span>
      <component :is="item.type" :model="item.model" :inputType="item.inputType" :selectOptions="item.selectOptions" @changeval="changeValue($event)"></component>
    </div>
    <button type="submit" class="btn">Отправить заявку</button>
  </form>
</template>

<script>
import InputElement from '@/components/InputElement'
import SelectElement from '@/components/SelectElement'
import TextareaElement from '@/components/TextareaElement'

export default {
  name: "user_form",
  components: {
    InputElement,
    SelectElement,
    TextareaElement
  },
  data() {
    return {
      address: "",
      flat: "",
      userName: "",
      connectionDate: null,
      tel: null,
      currentProvider: null,
      floor: null,
      portNum: null,
      comment: ""
    };
  },
  computed: {
    formRender() {
      return [
        {
          name: "Адрес:",
          model: this.address,
          type: InputElement,
          inputType: "text"
        },
        {
          name: "Квартира:",
          model: this.flat,
          type: InputElement,
          inputType: "number"
        },
        {
          name: "Ваше ФИО:",
          model: this.userName,
          type: InputElement,
          inputType: "text"
        },
        {
          name: "Желаемая дата и время подключения:",
          model: this.connectionDate,
          type: InputElement,
          inputType: "datetime"
        },
        {
          name: "Телефон:",
          model: this.tel,
          type: InputElement,
          inputType: "tel"
        },
        {
          name: "Ваш текущий провайдер:",
          model: this.currentProvider,
          type: SelectElement,
          selectOptions: ['first', 'second']
        },
        {
          name: "Этаж:",
          model: this.floor,
          type: InputElement,
          inputType: "number"
        },
        {
          name: "Номер порта:",
          model: this.portNum,
          type: InputElement,
          inputType: "number"
        },
        {
          name: "Примечание:",
          model: this.comment,
          type: TextareaElement
        }
      ];
    }
  },
  methods: {
    sendData() {
      console.log('address', this.address)
    },
    changeValue(e) {
      this.address = e.target.value
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
