<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: [String, Number, undefined],
  },
  data() {
    return {
      model: this.$props.value,
      editing: false,
    };
  },
  methods: {
    toggleEditing: function () {
      if (this.editable) {
        this.editing = !this.editing;
      }
    },
  },
  emits: ["update:modelValue"],
};
</script>

<template>
  <div @click.prevent="toggleEditing" class="field">
    <input
      v-if="editing"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @click.stop="() => undefined"
    />
    <div v-else>
      {{ modelValue }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.field {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  border: 1px solid var(--color-border);
  padding: 0.25rem;
  min-height: 35px;

  input {
    padding: 4px;
  }
}
</style>
