<template>
  <div class="container">
    <header><h1>Headline</h1></header>
    <main class="main">
      <div class="card-list">
        <Card
            v-for="post in getAllPosts"
            :key="post.id"
            :post="post"
        />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Card
  },

  computed: {
    ...mapGetters(["getAllPosts"]),
  },

  methods: {
    ...mapActions(['fetchPosts']),
  },

  mounted() {
    this.fetchPosts();
  }
}
</script>
<style lang="sass" scoped>
.main
  padding: 20px 0 100px
.card-list
  display: flex
  flex-wrap: wrap
  gap: 20px
</style>