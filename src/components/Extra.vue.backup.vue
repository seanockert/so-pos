PosCart.vue
  <swipe-list :items="cart.items" transition-key="index" @swipeout:contentclick="contentClick" @swipeout:click="itemClick" @swipeout:doubleclick="itemDblClick">
    <template slot-scope="{ item, index, revealLeft, revealRight, close }">
      <div class="card-content">
        <h2>{{ item.title }}</h2>
      </div>
    </template>
    <template slot="left" slot-scope="{ item }">
        <div class="swipeout-action">Add</div>
    </template>
    <template slot="right" slot-scope="{ item }">
      <div class="swipeout-action">Delete</div>
    </template>
    <div slot="empty">Cart empty</div>
  </swipe-list>

<script>
  import { SwipeList, SwipeOut } from 'vue-swipe-actions';
  /*import 'vue-swipe-actions/dist/vue-swipe-actions.css'*/


  components: {
    SwipeOut,
    SwipeList
  },
  methods: {
    contentClick(e) {
      console.log(e, 'content click');
    },
    itemClick(e) {
      console.log(e, 'item click');
    },
    itemDblClick(e) {
      console.log(e, 'item double click');
    },
    fbClick(e) {
      console.log(e, 'First Button Click');
    },
    sbClick(e) {
      console.log(e, 'Second Button Click');
    }
  }
</script>

<style>
.swipeout {
  position: relative;
  overflow: hidden;
  user-select: none;
  display: flex;
}
.swipeout.swipeout--disabled {
  user-select: auto;
}
.swipeout .swipeout-left,
.swipeout .swipeout-right {
  position: absolute;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 1;
}
.swipeout.swipeout--transitioning .swipeout-action,
.swipeout.swipeout--transitioning .swipeout-content {
  transition: transform 0.3s;
}
.swipeout .swipeout-content {
  width: 100%;
}
.swipeout .swipeout-action,
.swipeout .swipeout-content {
  will-change: transform;
}
.swipeout .swipeout-left {
  left: 0;
  transform: translateX(-100%);
  text-align: right;
}
.swipeout .swipeout-right {
  right: 0;
  transform: translateX(100%);
}
.swipeout-list-item {
  outline: none;
}

.swipeout-action {
  width: inherit;
  background-color: red;
  color: #fff;
  font-size: 16px;
}

.swipeout .swipeout-left,
.swipeout .swipeout-right {
  width: 100%;
  position: absolute;
  display: flex;
}
</style>