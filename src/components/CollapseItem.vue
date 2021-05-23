<template>
  <StackLayout :visibility="visible ? '' : 'collapsed'">
    <slot></slot>
  </StackLayout>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped></style>
