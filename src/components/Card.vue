<template>
  <article
      class="card"
      :class="post.rated ? 'card_rated' : ''"
  >
    <header class="card__img">
      <img draggable="false" :src="post.image" :alt="post.name" >
      <div class="card__tag-container">
        <span class="card__tag" v-if="post.tag">#{{ post.tag }}</span>
      </div>
    </header>
    <div class="card__body">
      <a href=""><h5 class="card__title">{{ post.name}}</h5></a>
      <p class="card__text">{{ post.description }}</p>
      <footer class="card__bottom">
        <div class="card__date">{{ post.date }}</div>
        <div class="card__rate">
          <button class="card__rate-btn" @click="ratePost(post)">
            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.27886 13L6.25982 12.0109C2.47481 8.76087 0 6.57065 0 3.88587C0 1.69565 1.74693 0 4.00337 0C5.24078 0 6.47818 0.565217 7.27886 1.4837C8.07953 0.565217 9.31694 0 10.5543 0C12.8108 0 14.5577 1.69565 14.5577 3.88587C14.5577 6.57065 12.0829 8.76087 8.2979 12.0109L7.27886 13Z" />
            </svg>
          </button>
          <span class="card__rate-count">{{ post.like }}</span>
        </div>
      </footer>
    </div>
  </article>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "Card",

  props: {
    post: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    ...mapMutations(['ratePost']),

    ratePost(post, $event){
      this.$store.commit('ratePost', post);
      this.$emit('ratePost', $event);
    }
  },
}

</script>

<style scoped lang="sass">
.card
  $self: &
  background: #fff
  border-radius: 4px
  padding: 10px
  width: calc(25% - 15px)
  &_rated
    #{ $self }__rate-btn
      color: $red
  &__img
    display: flex
    flex-wrap: wrap
    align-items: flex-end
    position: relative
    border-radius: 2px
    overflow: hidden
    padding: 10px 8px
    min-height: 250px
    margin-bottom: 21px
    background: #F7F7F7
    &:after
      content: ''
      position: absolute
      bottom: 0
      left: 0
      right: 0
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)
      opacity: .5
      width: 100%
      height: 40%
    & img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center
  &__body
    padding: 0 8px
    display: flex
    flex-direction: column
  &__title
    @include h5
    margin-bottom: 28px
  &__text
    @include text
    color: $color-text
    margin-bottom: 25px
  &__tag-container
    margin-top: auto
  &__tag
    @include tag
    position: relative
    z-index: 2
    display: inline-block
    background: rgba(141, 190, 80, 0.5)
    border-radius: 4px
    color: #fff
    padding: 7px 10px
    margin: 5px 5px 0 0
  &__bottom
    display: flex
    justify-content: space-between
    align-items: center
  &__date
    @include specialtext
    color: $color-text-1
  &__rate
    display: flex
    align-items: center
    color: $color-text-1
  &__rate-btn
    margin-right: 5px
    & svg
      transition: all .2s ease
      &:hover
        transform: scale(1.2)
  &__rate-count
    font-family: $font-default
    font-style: normal
    font-weight: normal
    font-size: 12px
    line-height: 22px
</style>