<template>
  <div class="addItem">
    <input type="text" v-model="item.name" @input="checkItemName" />

    <font-awesome-icon
      icon="plus-square"
      @click="addItem()"
      :class="[item.name ? 'active' : 'inactive', 'plus']"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      item: {
        name: " ",
      },
    };
  },
  methods: {
    addItem() {
      if(this.item.name==''){
        return;
      }

      axios.post('api/item/store',{
        item: this.item
      })
      .then( response=>{
        if( response.status == 201 ){
          this.item.name= "";
          this.$emit('reloadlist')
        }
      })
      .catch( error=>{
        console.log(error);

      })
    },
  },
};
</script>

<style scoped>
.addItem {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

input {
  background: #c3c3c3;
  margin-right: 10px;
  outline: none;
  border: 0px;
  width: 100%;
}

.plus {
  color: #ccc;
  font-size: 24px;
  transition: color 0.3s ease;
}

.plus:hover {
  color: #555;
}

.active {
  color: #11d41b;
}

.inactive {
  color: #00a3cc;
}
</style>
