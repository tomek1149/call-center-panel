<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="app">
    <AppSidebar />
    <main class="app__main">
      <Toast />
      <ConfirmDialog class="confirm-dialog" />
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  min-height: 100vh;

  &__main {
    flex: 1;
    padding: $spacing-lg;
    overflow-x: auto;
    background: $color-bg;
  }

  @include mobile {
    flex-direction: column;
  }
}
</style>
