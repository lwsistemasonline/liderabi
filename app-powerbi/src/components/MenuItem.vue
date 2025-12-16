<template>
  <div v-if="item">
    <!-- Menu item with children (expandable) -->
    <q-expansion-item
      v-if="item && item.children && item.children.length > 0"
      :icon="item.icon"
      :label="item.title"
      :caption="item.caption"
      header-class="menu-item-header"
      expand-separator
      :default-opened="item.expanded"
    >
      <template v-for="child in item.children" :key="child.title">
        <!-- Child with nested children (Auxiliares) -->
        <q-expansion-item
          v-if="child.children && child.children.length > 0"
          :icon="child.icon"
          :label="child.title"
          header-class="menu-child-item-header"
          dense
        >
          <q-item
            v-for="subChild in child.children"
            :key="subChild.title"
            clickable
            v-ripple
            :active="route.name === subChild.route"
            @click="navigateTo(subChild.route)"
            class="menu-subchild-item"
          >
            <q-item-section v-if="subChild.icon" avatar class="menu-subchild-icon">
              <q-icon :name="subChild.icon" size="xs" />
            </q-item-section>
            <q-item-section class="menu-subchild-text">
              <q-item-label>{{ subChild.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Regular child item -->
        <q-item
          v-else
          :key="child.title"
          clickable
          v-ripple
          :active="route.name === child.route"
          @click="navigateTo(child.route)"
          class="menu-child-item"
        >
          <q-item-section v-if="child.icon" avatar class="menu-child-icon">
            <q-icon :name="child.icon" size="xs" />
          </q-item-section>
          <q-item-section class="menu-child-text">
            <q-item-label>{{ child.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <!-- Regular menu item (no children) -->
    <q-item
      v-else-if="item"
      clickable
      v-ripple
      :active="route.name === item.route"
      @click="navigateTo(item.route)"
    >
      <q-item-section v-if="item.icon" avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label v-if="item.caption" caption>{{ item.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()

function navigateTo(routeName) {
  if (routeName) {
    router.push({ name: routeName })
  }
}
</script>

<style lang="scss" scoped>
.menu-item-header {
  font-weight: 500;
}

.menu-child-item {
  padding-left: 3rem;
  
  &:hover {
    background-color: rgba(4, 187, 211, 0.1);
  }

  // Reduce spacing between icon and text by 50%
  :deep(.menu-child-icon) {
    min-width: 24px;
    padding-right: 8px; // Reduced from default ~16px to ~8px (50%)
  }

  :deep(.menu-child-text) {
    padding-left: 0;
    margin-left: 0;
  }
}

.menu-child-item-header {
  padding-left: 3rem;
  font-weight: 400;
  font-size: 0.9rem;

  // Reduce spacing between icon and text by 50% for Auxiliares
  :deep(.q-item__section--avatar) {
    min-width: 24px;
    padding-right: 8px; // Reduced from default ~16px to ~8px (50%)
  }

  :deep(.q-item__section--main) {
    padding-left: 0;
    margin-left: 0;
  }
}

.menu-subchild-item {
  padding-left: 5rem;
  
  &:hover {
    background-color: rgba(4, 187, 211, 0.08);
  }

  // Reduce spacing between icon and text by 50%
  :deep(.menu-subchild-icon) {
    min-width: 24px;
    padding-right: 8px; // Reduced from default ~16px to ~8px (50%)
  }

  :deep(.menu-subchild-text) {
    padding-left: 0;
    margin-left: 0;
  }
}

.body--dark {
  .menu-child-item:hover {
    background-color: rgba(4, 187, 211, 0.15);
  }
  
  .menu-subchild-item:hover {
    background-color: rgba(4, 187, 211, 0.12);
  }
}
</style>

