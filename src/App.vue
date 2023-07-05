<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.png'
</script>

<template>
  <header class="header">
    <div class="header__container">
      <img class="header__logo" :src="logo" alt="" />
      <nav class="header__nav nav">
        <RouterLink class="nav__item" to="/">Users</RouterLink>
        <RouterLink class="nav__item" to="/payment">Payments</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  padding: 10px;

  background: rgb(17, 17, 17);
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.header__logo {
  width: 70px;
}

.header__nav {
  display: flex;
  width: 200px;
  justify-content: space-around;
}

.nav__item {
  position: relative;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid transparent;
  border-radius: 20px;

  color: aliceblue;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    border-bottom: 1px solid white;
    border-radius: 0;
    transition: 1s;
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    display: block;
    width: 1px;
    height: 20px;
    left: 80px;
    background: rgb(255, 153, 0);
  }

  &[aria-current] {
    color: rgb(253, 176, 8);
  }
}
</style>
