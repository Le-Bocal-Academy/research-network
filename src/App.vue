<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<script>
import * as authApi from "@/lib/auth";

export default {
  data() {
    return { isLoggedIn: authApi.isLoggedIn() };
  },
  mounted() {
    this.$router.beforeEach(() => {
      this.isLoggedIn = authApi.isLoggedIn();
    });
  },
};
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/profile">My Profile</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/logout">Logout</RouterLink>
      <RouterLink v-else to="/signin">Login/Register</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 4rem;
}
main {
  width: 100%;
  flex-grow: 1;
  height: calc(100% - 4rem);
}

nav {
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
