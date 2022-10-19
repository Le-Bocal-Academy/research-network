<script setup>
import SmartField from "@/components/SmartField.vue";
</script>

<script>
import * as userApi from "@/lib/auth";
import * as postApi from "@/lib/posts";

export default {
  props: ["id"],
  data() {
    return {
      profile: {},
      posts: [],
      canEditProfile: false,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => this.fetchData(),
      { immediate: true }
    );
  },
  methods: {
    fetchData: async function () {
      if (!userApi.isLoggedIn()) {
        this.$router.push("/signin");
        return;
      }
      await this.getProfile();
      await this.getPosts();
    },
    getPosts: async function () {
      const data = await postApi.getPosts();
      if (data && data.posts) {
        this.posts = data.posts.filter(
          (post) => post.userId === this.profile._id
        );
      }
    },
    getProfile: async function () {
      this.profile = await userApi.getProfile(this.id);
      // Si profile est bien renseigné, et que id n'est pas dans la barre d'adresse
      // c'est que c'est le profil de l'utilisateur connecté
      this.canEditProfile = Boolean(this.profile._id && !this.id);
    },
    updateProfile: async function () {
      if (this.canEditProfile) {
        await userApi.updateProfile(this.profile);
      }
    },
  },
  computed: {
    canShowProfile: function () {
      return typeof this.profile === "object";
    },
    enumerableFields: function () {
      return [
        { name: "firstname", label: "Prénom" },
        { name: "lastname", label: "Nom de famille" },
        { name: "email", type: "email", label: "Email" },
        { name: "occupation", label: "Job" },
        { name: "age", type: "number", label: "Age" },
      ];
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <h1>Profil</h1>
    <form v-if="canShowProfile" @submit.prevent="updateProfile">
      <label v-for="field in enumerableFields" :key="field.name">
        <p>{{ field.label }}</p>
        <SmartField
          v-model="profile[field.name]"
          :type="field.type"
          :editable="canEditProfile"
        />
      </label>
      <button v-if="canEditProfile" type="submit">Modifier mon profil</button>
    </form>
    <p v-else>{{ profile }}</p>
  </div>
</template>

<style scope lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  form {
    width: 420px;
    gap: 1rem;

    label p {
      font-size: 0.6rem;
      margin: 0;
      padding: 0;
      align-items: flex-start;
    }
    textarea {
      resize: vertical;
    }
  }
}
</style>
