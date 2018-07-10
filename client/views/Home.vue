<template>
  <div class="content has-text-centered">
    <p>
      <img width="200" src="~assets/logo.svg" :alt="description">
    </p>

    <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

    <p></p>
  </div>
</template>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}

</style>

<script>
export default {

  data () {
    return this.$store.state.pkg
  },

  mounted () {
    console.log(this)
    console.log(this.name)
  }

}
</script>
