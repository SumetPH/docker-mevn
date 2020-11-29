<template>
  <div class="home">
    <form @submit.prevent="add">
      <input type="text" v-model="text">
      <button type="submit">Save</button>
    </form>
    <div v-for="(item, index) in todos" :key="index">
      <p @click="remove(item._id)">{{item.text}}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        todos: [],
        text: ''
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:3000/todos').then(res => {
          console.log(res)
          this.todos = res.data
        })
      },
      add() {
        axios.post('http://localhost:3000/todos', {
          text: this.text
        }).then(res => {
          console.log(res)
          this.fetchData()
          this.text = ''
        })
      },
      remove(_id) {
        axios.delete(`http://localhost:3000/todos/${_id}`).then(res => {
          console.log(res)
          this.fetchData()
        })
      }
    },
  }
</script>