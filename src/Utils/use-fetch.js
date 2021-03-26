import { toRefs, reactive } from "vue";

export default function (url) {
  const state = reactive({
    response: [],
    error: "",
  });
  const fetchData = () => {
    state.fetching = true;
    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          state.response.value = data;
        },
        (error) => {
          console.log(error);
          state.error = error;
        }
      );
   
  };
  fetchData();
  return { ...toRefs(state), fetchData };
}
