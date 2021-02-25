<template>
  <div class="row mb-3">
    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 mb-2">
      <div @click="playVideo" class="embed__container">
        <iframe
          class="responsive-iframe"
          :src="src"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="pointer-events: none"
        ></iframe>
      </div>
    </div>
    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
      <div class="video-detail__container">
        <h3 @click="playVideo" class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VideoHelper from "../services/VideoHelper";

export default {
  props: {
    propVideoId: {
      type: String,
    },
  },
  data() {
    return {
      socket: "",
      id: "",
      src: "",
      title: "",
      description: "",
    };
  },
  created() {
    this.socket = io(process.env.MIX_WS_SERVER);
    this.socket.on("connect", () => console.log("connected to socket success"));
  },
  mounted() {
    VideoHelper.getVideoDetail(this.propVideoId).then((data) => {
      this.id = this.propVideoId;
      this.src = data.embed_url;
      this.title = data.title;
      this.description = data.description;
    });
  },
  methods: {
    playVideo: function () {
      this.socket.emit('play_video', {
        room: 'user_1',
        data: {
          videoId: this.id
        }
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.page__container {
  margin-top: 20px;
  font-family: "Poppins", sans-serif;
}

.embed__container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  cursor: pointer;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.video-detail__container {
  .title {
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }
  .description {
    font-family: "Poppins", sans-serif;
    color: #525456;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-weight: normal;
    font-size: 13px;
  }
}
</style>
