<template>
  <div 
  сlass="search-bar" 
  :style="{'position' : (isVisible) ? 'absolute' : 'fixed'}" 
  @сlick.self="hideList"
  >
    <input 
    type="text" 
    v-model="input" 
    placeholder="Create or find category" 
    @focus="isVisible = true"
    @blur="isVisible = false"
    @change="$emit('change', selectedItem.Id)"
    />
    <div class="search-bar-options" v-if="isVisible" >
      <div v-for="category in filteredUser" :key="category.Id" class="search-bar-option" > 
        <p  class="pointer category" @click="selectCategory(category)">
          {{ category.Title }}
        </p>
      </div>
      <div v-if="filteredUser.length === 0">
        <p>No results found!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      selectedItem: null,
      isVisible: false,
    };
  },
  created() {
    document.addEventListener('click', (e) => {
      let isInput = e.target instanceof HTMLInputElement;
      let isCategoryEl = e.target.classList.contains('category');
      if (isInput || isCategoryEl) return;
      this.isVisible = false;
    })
  },
  computed: {
    categories(){
      if(!this.$store.getters.categories){
        this.$store.dispatch("getCategories");
      }
      return this.$store.getters.categories;
    },
    filteredUser() {
      const query = this.input.toLowerCase();
      if (this.input === "") {
        return this.categories;
      } else {
        return this.categories.filter(category => {
          return category.Title.toLowerCase().includes(query);
        });
      }
    },
  },
  methods: {
    selectCategory(category) {
      this.selectedItem = category;
      this.input = category.Title;
      this.isVisible = false;
    },
    hideList() {
      this.isVisible = false;
    }
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.show {
  visibility: show;
}
.hide {
  visibility: hidden;
}

.search-bar-options{
  position : absolute;
  background-color: white;
  display:flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 220px;
  max-height: 300px;
  overflow-y:scroll;
  padding: 5px;
}
.search-bar-option{
  width: 175px;
  text-align: left;
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  padding: 5px;
}
</style>


