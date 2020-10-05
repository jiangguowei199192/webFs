<template>
  <div class="container">
    <div
      class="menu_tab"
      v-for="item in itemData.info"
      :key="item.id"
      @click="tabChecked(item.id)"
    >
      <img
        :src="item.selected ? item.selectedImgPath : item.normalImgPath"
        class="menu_tab_icon"
      />
      <span
        class="menu_tab_li"
        :class="item.selected ? 'tabSelected' : 'tabNormal'"
        >{{ item.title }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    tabChecked (id) {
      //   console.log(id)
      this.$emit('leftTabSelected', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .menu_tab {
    line-height: 40px;
    cursor: pointer;
    .menu_tab_icon {
      width: 24px;
      height: 24px;
      margin: 8px 0px 0px 31px;
    }
    .menu_tab_li {
      margin-left: 20px;
      line-height: 40px;
      vertical-align: top;
      font-size: 18px;
      color: #85cfe8;
    }
    .tabSelected {
      color: #fff;
    }
    .tabNormal {
      color: #85cfe8;
    }
  }
}
</style>
