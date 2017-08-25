<template>
  <div>
    <create-tweet v-on:create-tweet="createTweet"></create-tweet>
    <div class="tweets">
      <tweet v-for="tweet in tweets" :key="tweet._id" v-bind:message="tweet"></tweet>
    </div>
  </div>
</template>

<script>
  import Tweet from './Tweet.vue'
  import CreateTweet from './CreateTweet.vue'

  export default {
    components: {
      Tweet,
      CreateTweet
    },
  	data () {
      return {
        tweets: []
      }
    },
    methods: {
      getTweets () {
        this.$http.get('http://localhost:3000/getMessages').then(
          ({body:tweets}) => {
            this.tweets = tweets.reverse()
          }
        )
      },
      createTweet (tweet) {
        this.$http.post('http://localhost:3000/sendMessage', tweet).then(
          () => {
            console.info('sent');
          },
          ({body: message}) => {
            console.error(message);
          }
        )
      }
    },
    ready () {
      this.getTweets()
      setInterval(this.getTweets, 1000)
    }
  }
</script>

<style scoped>
  div {
    display: flex;
    flex-flow: column;
  }
  .tweets {
    margin-top: 10px;
  }
</style>
