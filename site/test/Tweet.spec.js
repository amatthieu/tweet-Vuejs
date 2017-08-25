import Vue from 'vue'
import Tweet from '../src/Tweet.vue'
import VueResource from 'vue-resource'
import moment from 'moment'

(function() {
  Vue.prototype.moment = moment
  Vue.use(VueResource);
})();

function createComponent(Component, props) {
  const mount = document.createElement('div');
  const tweet = Vue.extend(Component)
  return new tweet({
    el: mount,
    propsData: props
  })
}

describe('Tweet test', () => {
  it("should have a message", () => {
    const props = {
      message: {
        msg: 'toto',
        userName: 'moi',
        sendDate: '2017-09-28'
      }
    }
    const vm = createComponent(Tweet, props)

    expect(vm.$el.getElementsByClassName('message')[0].innerHTML).toBe(props.message.msg);
  });
});