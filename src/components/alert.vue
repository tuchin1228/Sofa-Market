<template>
  <div
    class="alerts"
    :class="{
      show: Alert.isShow,
      success: Alert.type == 'success',
      danger: Alert.type == 'danger',
    }"
  >
    {{ Alert.content }}
  </div>
</template>

<script>
export default {
  computed: {
    Alert() {
      return this.$store.state.Alert;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/alert.scss";
</style>
