<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Users</RouterLink>
        <RouterLink to="/payment">Payments</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
