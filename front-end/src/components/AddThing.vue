<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="thing.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="thing.description"
          name="description"
        />
      </div>

      <button @click="saveThing" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newThing">Add</button>
    </div>
  </div>
</template>

<script>
import ThingDataService from '../services/ThingDataService';

export default {
  name: 'add-thing',
  data() {
    return {
      thing: {
        id: null,
        title: '',
        description: '',
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveThing() {
      var data = {
        title: this.thing.title,
        description: this.thing.description
      };

      ThingDataService.create(data)
        .then(response => {
          this.thing.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newThing() {
      this.submitted = false;
      this.thing = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
