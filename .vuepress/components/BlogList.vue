<style scoped></style>

<template>
  <div class="blog-list">
    <ul class="list">
      <li v-for="item in list">
        <p>path - <router-link :to="item.path">{{ item.path }}</router-link></p>
        <p>title - {{ item.title }}</p>
        <p>lastUpdated - {{ item.lastUpdated || 'null' }}</p>
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
      console.dir(this.$site.pages)
      // console.log(JSON.stringify(this.$site.pages))
    }
  }
</script>
