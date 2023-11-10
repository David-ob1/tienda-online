const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      productoDetalle: {},
    };
  },
  mounted() {
    this.carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  },

  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
      .then((respuesta) => respuesta.json())
      .then((info) => {
        this.productos = info;
        console.log(this.productos);
        let parametro = location.search;
        let params = new URLSearchParams(parametro);
        let idProducto = params.get("parametro");
        this.productoDetalle = this.productos.find(
          (producto) => producto._id == idProducto
        );
        console.log(this.productoDetalle);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    addCar(producto) {
      if (!this.carrito.includes(producto._id)) {
        this.carrito.push(producto._id);
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
      }
      console.log(this.carrito);
    },
  },
}).mount("#app");
