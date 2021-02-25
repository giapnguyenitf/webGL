<template>
  <div class="list-video__container">
    <template v-for="item in propItems">
      <old-video :key="item" :propVideoId="item"></old-video>
    </template>
  </div>
</template>

<script>
import OldVideo from "./OldVideo";

export default {
  components: {
    OldVideo,
  },
  props: {
    propItems: {
      type: Array,
      default: function () {
        return [];
      },
    },
  }
};
</script>
<style lang="scss" scoped>
.list-video__container {
  max-height: 70vh;
  overflow: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
