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
    // вычисляемые
    totalCost() {
      return this.getBasket.reduce((acc, good) => acc + good.price * good.quantity, 0);
    }
  },
  methods: {
    handleSearchClick() {
      const regexp = new RegExp(this.searchQuery, 'i');
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.name));
      console.log(this.filteredGoods);
    },
    handleBuyClick(goods) {
      const basketGood = this.getBasket.find((entry) => entry.id === goods.id);
      if (basketGood) {
        // товар есть => увеличим количество
        fetch(`${API_URL}/getbasket/${goods.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quantity: basketGood.quantity + 1
            }),
          })
          // обрабатываем запрос
          .then((response) => response.json())
          .then((goods) => {
            const goodsIdx = this.getBasket.findIndex((entry) => entry.id === goods.id);
            // тоже рабочий вариант:
            // this.getBasket[goodsIdx].quantity = goods.quantity;
            // но тот что ниже => Лучше
            // vue отслеживает свойства и в массив-getBasket по найденному индексу-goodsIdx заносит данные-goods
            Vue.set(this.getBasket, goodsIdx, goods);
          });
      } else {
        // товара нет => добавим товар
        fetch(`${API_URL}/getbasket`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // далее, в body (ключевое слово) передаем то что отправляем на сервер
            // здесь интересный момент 24 минута урока номер 6
            // здесь нужно подумать, когда у товара на складе есть количество !!!
            body: JSON.stringify({
              ...goods,
              quantity: 1
            })
          })
          // обработка ответа от сервера
          .then((response) => response.json())
          .then((goods) => {
            this.getBasket.push(goods);
          });
      }
    },
    handleDeleteClick(goods) {
      if (goods.quantity > 1) {
        fetch(`${API_URL}/getbasket/${goods.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: goods.quantity - 1 }),
          })
          // обрабатываем запрос
          .then((response) => response.json())
          .then((goods) => {
            const goodsIdx = this.getBasket.findIndex((entry) => entry.id === goods.id);
            // тоже рабочий вариант:
            // this.getBasket[goodsIdx].quantity = goods.quantity;
            // но тот что ниже => Лучше
            // vue отслеживает свойства и в массив-getBasket по найденному индексу-goodsIdx заносит данные-goods
            Vue.set(this.getBasket, goodsIdx, goods);
          });
      } else {
        fetch(`${API_URL}/getbasket/${goods.id}`, {
            method: 'DELETE',
          })
          .then(() => {
            this.getBasket = this.getBasket.filter((basketGood) => basketGood.id !== goods.id);
          });
      }
    }
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