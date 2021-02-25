<template>
  <div>
    <video v-show="src" autoplay muted loop id="myVideo" ref="previewVideo">
      <source :src="src" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
    <div v-if="!src" class="no-video">
      <h3>No video available</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      src: "",
    };
  },
  created() {
    this.socket = io(process.env.MIX_WS_SERVER);
    this.socket.on("connect", () => console.log("connected to socket success"));
    this.socket.emit("add_user", 1);

    this.socket.on("preview_video", (event) => {
      if (event.src) {
        this.isLoading = true;
        this.$refs.previewVideo.style.opacity = 0;
        this.src = event.src;
        this.$refs.previewVideo.load();
        this.$refs.previewVideo.oncanplaythrough = () => {
          this.fadeVideo(this.$refs.previewVideo);
        }
      }
    });


  },
  methods: {
    fadeVideo: function (element) {

      if (this.isLoading) {
        var op = 0;
        var timer = setInterval(function() {
            if (op >= 1) clearInterval(timer);
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1 || 0.1;
        }, 50);

        this.isLoading = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.no-video {
  text-align: center;
  position: absolute;
  top: calc(50% - 15px);
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes ldio-zzkfv500dwh {
  0% {
    background: #5699d2;
  }
  12.5% {
    background: #5699d2;
  }
  12.625% {
    background: #1d3f72;
  }
  100% {
    background: #1d3f72;
  }
}
.ldio-zzkfv500dwh div {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #1d3f72;
  animation: ldio-zzkfv500dwh 1s linear infinite;
}
.loadingio-spinner-blocks-y8lhutq7se {
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: none;
  position: absolute;
  z-index: 1000;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
.ldio-zzkfv500dwh {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-zzkfv500dwh div {
  box-sizing: content-box;
}
</style>
