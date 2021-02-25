<template>
  <div class="video-manage__container">
    <div class="input-video__container">
      <div class="form-group">
        <label style="font-weight:bold;" for="url">Youtube url</label>
        <input
          v-model="url"
          type="text"
          class="form-control"
          name="url"
          id="url"
        />
      </div>
      <button type="button" class="btn btn-info" v-on:click="emitEvent()">
        Play
      </button>
    </div>

    <div class="history__container mt-5">
      <h3>History <a href="/live-video" target="__blank" style="font-size:13px">Go to live site</a></h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in videoUrls" :key="item">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
import VideoHelper from "../services/VideoHelper";

export default {
  data() {
    return {
      socket: "",
      url: "",
      videoIds: [],
    };
  },
  created() {
    this.socket = io(process.env.MIX_WS_SERVER);
    this.socket.on("connect", () => console.log("connected to socket success"));
  },
  computed: {
    videoUrls: function () {
      return this.videoIds.map((item) => this.getVideoUrl(item));
    },
  },
  methods: {
    emitEvent() {
      let videoId = VideoHelper.getVideoId(this.url);

      if (videoId) {
        this.socket.emit("play_video", {
          room: "user_1",
          data: {
            videoId: videoId,
          },
        });

        this.videoIds = this.videoIds.filter((item) => item != videoId);
        this.videoIds = Array.from(new Set([videoId, ...this.videoIds]));
      }

      this.url = "";
    },
    getVideoUrl: function (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    },
  },
};
</script>
