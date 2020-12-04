<template>
  <div class="dialogContent">
    <img :src="previewData.imgUrl" :alt="previewData.title" />
    <div class="contents">
      <h2>{{ previewData.title }}</h2>
      <h3 v-if="previewData.price !== previewData.origin_price">
        <span>特價 {{ previewData.price | currency }} </span>元
      </h3>
      <h4 v-if="previewData.price !== previewData.origin_price">
        原價 {{ previewData.origin_price | currency }} 元
      </h4>
      <h5 v-if="previewData.price == previewData.origin_price">
        售價 <span>{{ previewData.price | currency }}</span> 元
      </h5>
      <p>{{ previewData.desc }}</p>

      <router-link
        :to="{ name: 'ProductInfo', params: { productid: previewData.id } }"
        >了解更多</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previewData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/previewModal.scss";
</style>
