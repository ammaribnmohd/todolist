<template>
    <div class="todoListContainer">
      <div class="heading">
        <h2 id="title">Todo List</h2>   
        <add-item-form 
            @itemAdded="addItemToList"
            v-on:reloadlist="getList()"
        />
      </div>
      <list-view 
      :items="items"
      v-on:reloadlist="getList()"
      />
    </div>
  </template>
  
  <script>
  import addItemForm from './addItemForm.vue';
  import listView from './listView.vue';
  import axios from 'axios';
  
  export default {
    components: {
      addItemForm,
      listView
    },
    data() {
      return {
        items: []
      }
    },
    methods: {
      getList() {
        axios.get('api/items')
          .then(response => {
            this.items = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      addItemToList(newItem) {
        this.items.push(newItem);
      }
    },
    created() {
      this.getList();  // Fetch items on component creation.
    }
  }
  </script>
  
  <style scoped>
  .todoListContainer {
    width: 350px;
    margin: auto;
  } 
  
  .heading {
    text-align: center;
    background: #e7e7e7;
    padding: 10px;
  }
  
  #title {
    text-align: center;
    color: #444;
  }
  </style>
  