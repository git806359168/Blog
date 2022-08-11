<template>
  <div
    class="pager-container"
    v-if="pageNumber > 1">
    <a
      :class="{ disabled: current === 1 }"
      @click="handleClick(1)">
        &lt;&lt;
    </a>
    <a
      :class="{ disabled: current === 1 }"
      @click="handleClick(current - 1)">
        &lt;
      </a>
    <a
      v-for="(n, i) in unmber"
      :key="i"
      :class="{ active: n === current }"
      @click="handleClick(n)">
        {{ n }}
    </a>
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(current + 1)">
        &gt;
    </a>
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(pageNumber)">
        &gt;&gt;
    </a>
  </div>
</template>

// 分页组件，用于分页排列和点击下一页的切换

<script>
export default {
  props: {
    current: { // 当前页码
      type: Number,
      default: 1,
    },
    total: { // 标题
      type: Number,
      default: 0,
    },
    limit: { // 当前页总数
      type: Number,
      default: 10,
    },
    visibleNumber: { // 可见页码数量
      type: Number,
      default: 9,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    unmber() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/less/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  cursor: pointer;
  a {
    color: @primary;
    margin: 0 6px;
    &.disabled {
      color: @lightWords;
      cursor: text;
    }
    &.active {
      color: @words;
      cursor: text;
      font-weight: bold;
    }
  }
}
</style>