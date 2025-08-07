<script setup lang="ts"></script>

<template>
  <header class="app_header">
    <router-link to="/" class="logo-link">
      <img src="../assets/image/logor.png" alt="logo" class="logo-img" />
    </router-link>
    <router-link to="/historyAndSaves" class="text-link">
      <h1>History and Saves</h1>
    </router-link>
  </header>
</template>

<style scoped lang="scss">
.app_header {
  width: 100%;
  height: 70px;
  background: #2c3e50;
  display: flex;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  padding: 10px;
}

.logo-img {
  width: 300px;
  height: 60px;
  @media (max-width: 550px) {
    width: 180px;
    height: 38px;
  }
  }

.header__text {
  color: white;
}

.text-link {
  color: white;
  padding-inline: 18px;
  font-size: 8px;
}
</style>
