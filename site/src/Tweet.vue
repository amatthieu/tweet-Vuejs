<template>
  <div class="main">
    <div class="user">
      <img class="avatar" v-bind:src="message.gravatarUrl"/>
      <div class="user-name">
        <label>User</label><br/>
        {{ message.userName }}
      </div>
      <div class="date">
        {{ moment(message.sendDate).fromNow() }}
      </div>
    </div>
    <div class="message">{{ message.msg }}</div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 5px;
  border: 2px solid;
  border-radius: 10px;
  padding: 5px;
}

.user {
  display: flex;
  align-items: center;
  flex: 20;
  border-right: 1px dashed black;
  padding-right: 5px;
}

.message {
  padding-left: 5px;
  flex: 80;
}

.user-name {
  margin-left: 10px;
  padding-right: 5px;
  flex: 50;
}

.user-name label {
  font-weight: bold;
}

.avatar {
  border-radius: 10px;
}

.date {
  flex: 50;
}
</style>
