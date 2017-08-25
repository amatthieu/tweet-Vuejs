<template>
  <div class="main">
    <div class="user">
      <label>User Name</label>
      <input v-model="tweet.userName" type="text" pattern=".{3,20}"/>
      <label>Mail</label>
      <input v-model="tweet.mail" type="email" pattern=".{3,100}"/>
    </div>
    <div class="message">
      <label>Message</label>
      <textarea v-model="tweet.msg" pattern=".{5,100}"></textarea>
      <button v-on:click="sendForm()">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tweet: {
        userName: '',
        mail: '',
        msg: ''
      }
    }
  },
  methods: {
    sendForm () {
      this.$emit('create-tweet', this.tweet);
      this.tweet.msg = '';
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-flow: row;
  height: 100px;
}

.user {
  display: flex;
  flex-flow: column;
  flex: 20;
  margin-right: 10px;
}

.message {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 80;
  margin-left: 10px;
}

.message button {
  background-color: #39b539;
  border: 3px solid #39b539;
  border-radius: 5px;
}

.message button:hover {
  background-color: #3cc23c;
  border: 3px solid #3cc23c;
}

.message button:active {
  background-color: #267a26;
  border: 3px solid #267a26;
}

label {
  font-weight: bolder;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

textarea {
  resize: none;
  border-radius: 5px;
  border: 1px solid black;
}

input {
  border-radius: 25px;
  border: 1px solid black;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
