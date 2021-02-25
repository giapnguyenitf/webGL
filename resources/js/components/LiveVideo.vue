<template>
  <div class="row">
    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12" style="margin: 0 auto">
      <div class="row">
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
          <div class="row">

            <div class="col-12 mb-3">
              <div class="embed__container">
                <iframe
                  class="responsive-iframe"
                  :src="src"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <div class="col-12">
              <div class="video-detail__container">
                <h3 class="title">{{ title }}</h3>
                <p style="font-weight:bold;margin:0;">Description:</p>
                <p class="description">{{ description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
          <list-video :propItems="videoIds"></list-video>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VideoHelper from '../services/VideoHelper';
import ListVideo from './ListVideo.vue';

export default {
  components: {
    ListVideo
  },
  data() {
    return {
      socket: "",
      id: "",
      src: "",
      title: "",
      description: "",
      videoIds: [
        '9bxc9hbwkkw'
      ],
    };
  },
  created() {
    this.socket = io(process.env.MIX_WS_SERVER);
    this.socket.on("connect", () => console.log("connected to socket success"));
    this.socket.emit("add_user", 1);

    this.socket.on("play_video",  event => {
      let videoId = event.videoId;

      if (videoId) {
        VideoHelper.getVideoDetail(videoId).then (data => {
          this.videoIds = this.videoIds.filter((item) => item != videoId);
          this.videoIds = Array.from(new Set([this.id, ...this.videoIds]));

          this.id = videoId;
          this.src = data.embed_url;
          this.title = data.title;
          this.description = data.description;
        });
      }
    });
  },
  mounted() {
    let videoId = 'ulOb9gIGGd0';

    VideoHelper.getVideoDetail(videoId).then(data => {
      this.id = videoId;
      this.src = data.embed_url;
      this.title = data.title;
      this.description = data.description;
    });
  }
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
  }
  .description {
    font-family: "Poppins", sans-serif;
    color: #525456;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-weight: normal;
  }
}
</style>
