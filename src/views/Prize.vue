<template>
    <div>
        <div class="game-box">
            <template
            v-for="(val, idx) of boundList">
            <div v-if="idx == 4" class="game-item game-begin" 
                :key="idx"
                @click="beginGame">
                开始游戏
            </div>
            <div v-else :key="idx"
                class="game-item"
                :class="{
                active: idx === curGameIdx
                }">
                {{val}}
            </div>
            </template>
        </div>
    </div>
</template>

<script>
import Game from '../js/price.js';
export default {
  name: "Prize",
  data() {
    return {
        boundList: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        curGameIdx: ''
    };
  },
  mounted() {},
  methods: {

    updateGameIdx(order) {
      this.curGameIdx = order; 
    },

    gameFinish() {
      this.playing = false;
      console.log(this.curGameIdx, 'curGameIdx')
    },
    
    beginGame() {
      if (this.playing) return;
      this.playing = true;
      this.curGameIdx = 0;
      const game = new Game(this.curGameIdx);
      game.run(this.updateGameIdx);
      // 通过请求终止
      setTimeout(() => {
        game.finish(2, this.gameFinish)
      }, 3000);
    }
  }
};
</script>

<style scoped>
.game-box {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
}
.game-item {
    width: 10rem;
    height: 5rem;
    background: yellow;
    border: 1px solid transparent;
    transition: all 0.2s;
}
.game-begin {
    background: transparent;
}
.active {
    border: 1px solid black;
}
</style>

