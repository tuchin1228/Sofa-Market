<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item " :class="{'disabled':pages.has_pre==false}">
        <a
          class="page-link"
          href="#"
          tabindex="-1"
          aria-disabled="true"
          @click.prevent="sendpage(pages.current_page-1)"
        >Previous</a>
      </li>
      <li
        v-for="page in pages.total_pages"
        :key="page"
        class="page-item"
        :class="{'active':page===pages.current_page}"
      >
        <a
          class="
          page-link"
          href="#"
          @click.prevent="sendpage(page)"
        >
          {{ page }}</a>
      </li>

      <li class="page-item" :class="{'disabled':pages.has_next==false}">
        <a
          class="page-link"
          href="#"
          @click.prevent="sendpage(pages.current_page+1)"
        >Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    sendpage(topage) {
      this.$emit('getpage', topage);
    },
  },
};
</script>

<style>

</style>
