<style scoped></style>

<template>
  <div class="blog-list">
    <ul class="list">
      <li v-for="item in list" :key="item.key">
        <router-link :to="item.path">{{ item.title }}</router-link> - {{ item.lastUpdated }}
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
      let blogList = this.$site.pages.filter(el => /^\/blog\/.+/.test(el.path))
      this.list = blogList.sort((a, b) => {
        return b.lastUpdatedTimestamp - a.lastUpdatedTimestamp
      })
      // console.dir(this.$site.pages)
      // console.log(JSON.stringify(this.$site.pages))
    }
  }
</script>
