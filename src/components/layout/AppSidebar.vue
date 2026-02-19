<script setup lang="ts">
import { ref } from 'vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import type { MenuItem } from 'primevue/menuitem'
import { LABELS } from '@/constants/labels'

const mobileMenuVisible = ref(false)

const menuItems: MenuItem[] = [
  {
    label: LABELS.nav.panel,
    items: [
      {
        label: LABELS.nav.tickets,
        icon: 'pi pi-list',
        route: '/',
      },
    ],
  },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <i class="pi pi-headphones" />
      <span>{{ LABELS.nav.appName }}</span>
    </div>
    <Menu :model="menuItems" class="sidebar__menu" />
  </aside>

  <div class="mobile-header">
    <Button icon="pi pi-bars" severity="contrast" text @click="mobileMenuVisible = true" />
    <span class="mobile-header__title">{{ LABELS.nav.appName }}</span>
  </div>

  <Drawer v-model:visible="mobileMenuVisible" :header="LABELS.nav.menu">
    <Menu :model="menuItems" @focus="mobileMenuVisible = false" />
  </Drawer>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: $color-primary;
  display: flex;
  flex-direction: column;

  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: 0 $spacing-lg;
    height: $topbar-height;
    color: white;
    font-size: $font-size-lg;
    font-weight: 700;

    i {
      font-size: $font-size-xl;
    }
  }

  &__menu {
    width: 100%;
    background: transparent;
    border: none;

    :deep(.p-menu-item-link) {
      color: rgba(white, 0.7);
      transition: all 0.2s ease;

      &:hover {
        background: rgba(white, 0.1);
        color: white;
      }
    }

    :deep(.p-menu-item-icon) {
      color: rgba(white, 0.7);
    }

    :deep(.p-menu-submenu-label) {
      color: rgba(white, 0.4);
      font-size: $font-size-sm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  @include mobile {
    display: none;
  }
}

.mobile-header {
  display: none;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: $color-primary;
  color: white;

  &__title {
    font-size: $font-size-lg;
    font-weight: 700;
  }

  @include mobile {
    display: flex;
  }
}
</style>
