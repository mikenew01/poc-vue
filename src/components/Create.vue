<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Adicionar Item</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addItem">
          <div class="form-group">
            <label>Nome:</label>
            <input type="text" class="form-control" v-model="item.name" />
          </div>
          <div class="form-group">
            <label>Preço:</label>
            <input type="text" class="form-control" v-model="item.price" />
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Adicionar" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    name: "AddItem",
  },
  data() {
    return {
      item: {},
    };
  },
  methods: {
    addItem() {
      let uri = "http://localhost:4000/items/add";
      this.axios
        .post(uri, this.item)
        .then((res) => res.data.data);
    },
  },
};
</script>