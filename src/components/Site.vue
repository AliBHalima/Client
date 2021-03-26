<template>
 <!-- @click="item.fixed = !item.fixed" -->
  <div
    :class="item.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin mb-6'"
    @click="item.fixed = !item.fixed" 
    aria-hidden="true"
  >
    <button
      class="w-72 h-full bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow"
    >
      <div class="flex flex-col content-between">
        <div class="w-full">
          <img class="object-contain w-full ..." src="../assets/website.jpg" />
        </div>

        <div class="ml-4">
          <h6 class="text-left">{{ item.title }}</h6>
          <p class="text-left font-thin">{{ item.description }}</p>
        </div>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  setup(props) {
    console.log("Site items are ", props.item);
  },
  props: {
    item: Object,
  },
};
</script>
<style></style>
