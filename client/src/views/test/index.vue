<script lang="ts">
export default {
  name: 'test'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
const state = reactive({
});

const { } = toRefs(state);

onMounted(() => {

});

</script>

<template>
  <div class="app-container">
    test
    <div id="templateDesignDiv"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>