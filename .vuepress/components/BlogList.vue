<style scoped></style>

<template>
  <div class="blog-list">
    <ul class="list">
      <li v-for="item in list">
        <router-link :to="item.path">{{ item.title }}</router-link> - {{ new Date(item.lastUpdated).toLocaleString() }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'blog-list',
    data() {
      return {
        list: []
      }
    },
    created() {
      this.list = this.$site.pages.filter(el => /^\/blog\/.+/.test(el.path))
      // console.dir(this.$site.pages)
      // console.log(JSON.stringify(this.$site.pages))
    }
  }
</script>
