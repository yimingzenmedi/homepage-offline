<template>
  <div>
    <a-input-search
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="handleSearch"
    />
  </div>
</template>

<script>
  export default {
    name: "SearchBox",
    methods: {
      handleSearch() {

      }
    },
  }
</script>

<style scoped>

</style>