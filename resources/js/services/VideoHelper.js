const VideoHelper = {
  getVideoDetail: async function (videoId) {
    let apiKey = "AIzaSyCUVgG_mnYnlkv48RO0QaPcZTw0e2W7iEw";
    let uri = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    try {
      let res = await axios.get(uri);
      let videoDetail = res.data?.items[0]?.snippet;
      videoDetail.embed_url = this.getVideoEmbedCode(videoId);

      return videoDetail;
    } catch (error) {
      return {};
    }
  },
  getVideoId: function (url) {
    return new URL(url).searchParams.get("v");
  },
  getVideoEmbedCode: function (id) {
    return `https://www.youtube.com/embed/${id}`;
  },
}

export default VideoHelper;
