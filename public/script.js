const API_URL = 'http://localhost:3000';

const app = new Vue({
  el: '#app', // привязка к html-элементу <div id="app">
  data: {
    searchQuery: '',
    filterValue: '',
    filteredGoods: [],
    name: 'Chack',
    getBasket: [],
    catalogData: []
  },
  computed: {
    //  
  },
  methods: {
    handleSearchClick() {
      const regexp = new RegExp(this.searchQuery, 'i');
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.name));
      console.log(this.filteredGoods);
    },
  },
  mounted() {
    fetch(`${API_URL}/getbasket`)
      .then(response => response.json())
      .then((goods) => {
        this.getBasket = goods;
      });
    fetch(`${API_URL}/catalogdata`)
      .then(response => response.json())
      .then((goods) => {
        // this.catalogData = goods;
        this.goods = goods;
        this.filteredGoods = goods;
      });
  }
});