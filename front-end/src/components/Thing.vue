<template>
  <div v-if="currentThing" class="edit-form">
    <h4>Thing</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentThing.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentThing.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentThing.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentThing.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteThing"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateThing"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br/>
    <p>Please click on a Thing...</p>
  </div>
</template>

<script>
import ThingDataService from '../services/ThingDataService';

export default {
  name: 'thing',
  data() {
    return {
      currentThing: null,
      message: ''
    };
  },
  methods: {
    getThing(id) {
      ThingDataService.get(id)
        .then(response => {
          this.currentThing = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentThing.id,
        title: this.currentThing.title,
        description: this.currentThing.description,
        published: status
      };

      ThingDataService.update(this.currentThing.id, data)
        .then(response => {
          this.currentThing.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateThing() {
      ThingDataService.update(this.currentThing.id, this.currentThing)
        .then(response => {
          console.log(response.data);
          this.message = 'Thing updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteThing() {
      ThingDataService.delete(this.currentThing.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'things' });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getThing(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
