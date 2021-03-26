<template>
  <div>
    <button
      class="w-72 h-20 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      <div class="flex">
        <div class="w-1/6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
              clip-rule="evenodd"
            />
            <path
              d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
            />
          </svg>
        </div>
        <div class="w-5/6 m-auto">
          <h6 class="text-left ml-2">{{ title }}</h6>
          <p class="text-left font-thin ml-2">Folder</p>
        </div>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
  setup(props) {
    return { props };
  },
};
</script>
<style></style>
