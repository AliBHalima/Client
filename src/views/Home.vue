<template>
  <main>
    <div class="flex">
      <div class="lg:w-1/12 md:w-2/12 h-screen">
        <SideBar />
      </div>
      <div class="lg:w-11/12 md:w-10/12 bg-gray-100">
        <SearchBar />
        <div class="flex flex-col h-1/12 max-h-screen">
          <div class="flex justify-end h-full">
            <div class="flex items-center mr-8 p-auto">
              <div class="ml-1 relative rounded border-green-500">
                <div>
                  <button
                    type="button"
                    class="relative p-1"
                    @click="Display = 'flex'"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="ml-1 relative rounded border-green-500">
                <div>
                  <button class="relative p-1" @click="Display = 'grid'">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="h-3/12 ml-6 lg:flex sm:flex-row justify-start">
            <div
              class="mr-4"
              @drop="onDelete($event, items.value)"
              @dragenter.prevent
              @dragover.prevent
            >
              <Folder title="_assets" />
            </div>

            <div class="mr-4">
              <Folder title="16:9" />
            </div>
            <div class=" ">
              <Folder title="9:16" />
            </div>
          </div>

          <draggable
            v-if="Display == 'grid'"
            class="ml-6 mt-6 sm:grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 justify-start overflow-auto h-auto"
            tag="transition-group"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null,
            }"
            v-model="items.value"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            item-key="order"
          >
            <template #item="{ element }">
              <div @dragstart="startDrag($event, element)">
                <Site :item="element" />
              </div>
            </template>
          </draggable>

          <div
            v-if="Display == 'flex'"
            class="ml-6 mt-6 flex flex-col justify-start overflow-auto h-auto"
          >
            <draggable
              class="list-group"
              tag="transition-group"
              :component-data="{
                tag: 'ul',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
              }"
              v-model="items.value"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
              item-key="order"
            >
              <template #item="{ element }">
                <div @dragstart="startDrag($event, element)">
                  <Site :item="element" />
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import SearchBar from "../components/SearchBar.vue";
import Folder from "../components/Folder.vue";
import Site from "../components/Site.vue";

import { computed, ref } from "vue";
import useFetch from "../Utils/use-fetch.js";
import draggable from "vuedraggable";
import axios from "axios";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    SideBar,
    SearchBar,
    Folder,
    Site,
  },

  setup() {
    const Display = ref("flex");
    const items = ref([]);

    const { response, error } = useFetch("http://localhost:3000/Items");
    items.value = response.value;
    const log = (evt) => {
      window.console.log(evt);
    };
    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    });

    const startDrag = (event, item) => {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item.id);
    };

    // const onDrop =(event,fromList,toList)=>{
    //   console.log("List",List);
    //   console.log("fromList.value",fromList)
    //   const itemID = event.dataTransfer.getData('itemID');
    //  const item= fromList.find((item)=>item.id==itemID )
    //  toList.push(item);
    //  fromList.splice(fromList.indexOf(item), 1);
    // //  Rooms.value.splice(Rooms.value.indexOf(Currentroom.value), 1);
    //  console.log("fromlist", fromList);
    //  console.log("toliist",toList);
    // }

    const onDelete = (event, fromList) => {
      const itemID = event.dataTransfer.getData("itemID");
      const item = fromList.find((item) => item.id == itemID);
      if (item) {
        fromList.splice(fromList.indexOf(item), 1);
        axios
          .post("http://localhost:3000/Folders", {
            id: item.id,
            title: item.title,
            description: "New val",
          })
          .then((resp) => {
            console.log("data is ", resp);
          })
          .catch((error) => {
            console.log("error is ", error);
          });
      }
    };

    return {
      Display,
      items,
      response,

      error,
      log,

      startDrag,
      onDelete,
      dragOptions,
    };
  },
};
</script>
<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
