<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Things List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(thing, index) in things"
          :key="index"
          @click="setActiveThing(thing, index)"
        >
          {{ thing.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllThings">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentThing">
        <h4>Thing</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentThing.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentThing.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentThing.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/things/' + currentThing.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Thing...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ThingDataService from '../services/ThingDataService';

export default {
  name: 'things-list',
  data() {
    return {
      things: [],
      currentThing: null,
      currentIndex: -1,
      title: ''
    };
  },
  methods: {
    retrieveThings() {
      ThingDataService.getAll()
        .then(response => {
          this.things = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveThings();
      this.currentThing = null;
      this.currentIndex = -1;
    },

    setActiveThing(thing, index) {
      this.currentThing = thing;
      this.currentIndex = index;
    },

    removeAllThings() {
      ThingDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      ThingDataService.findByTitle(this.title)
        .then(response => {
          this.things = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveThings();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
