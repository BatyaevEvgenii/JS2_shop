const app = new Vue ({
  el: '#app', // привязка к html-элементу <div id="app">
  data: {
    name: 'Chack',
    getBasket: [
      {id: 1, name: "t-short", price: 100, desc: "Lorem ipsum dolor sit amet", quantity: 1},
      {id: 2, name: "socks", price: 200, "desc": "Lorem ipsum dolor sit amet", quantity: 1},
      {id: 3, name: "boots", price: 300, desc: "Lorem ipsum dolor sit amet", quantity: 1}
    ],
    catalogData: [
      {"id": 1, "name": "t-short", "price": 100, "desc": "Lorem ipsum dolor sit amet", "quantity": 10},
      {"id": 2, "name": "socks", "price": 200, "desc": "Lorem ipsum dolor sit amet", "quantity": 10},
      {"id": 3, "name": "boots", "price": 300, "desc": "Lorem ipsum dolor sit amet", "quantity": 10},
      {"id": 4, "name": "belt", "price": 400, "desc": "Lorem ipsum dolor sit amet", "quantity": 10}
    ]
  },
  methods: {
  }

});