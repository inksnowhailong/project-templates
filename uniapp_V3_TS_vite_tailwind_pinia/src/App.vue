<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import url("styles/tailwind.css");
.app-main {
  @apply w-screen h-screen bg-uni-color-primarybg text-uni-text-color overflow-hidden;
}

</style>
