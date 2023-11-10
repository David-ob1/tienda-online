const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodJug: [],
      valueSearch:``,
      filtrados:[],
      carrito:[],
      stock:0,
      precioTotal:0,
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
    // fetch(`https://mindhub-xj03.onrender.com/api/petshop`)

      .then((respuesta) => respuesta.json())
      .then((info) => {
        this.carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        console.log(this.carrito);

        JSON.stringify(this.carrito);
        console.log(this.carrito);

        for (producto of this.carrito) {
          console.log(producto);
          this.precioTotal += producto.precio;
        }

        for (producto of this.carrito) {
          console.log(producto);
          this.precioIndividual += producto.precio;
        }

        for (item of this.carrito){
          let aux =  info.find(product => product._id == item._id)
          aux.disponibles -= 1;
       }


        this.productos = info;
        this.prodJug = this.productos.filter(
          (producto) => producto.categoria === "jugueteria"
        );
        this.filtrados = this.prodJug;
        console.log(this.productos);
        console.log(this.prodJug);

        
      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtroSearch() {
      this.filtrados = this.prodJug.filter((producto) =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      )},

      addCar(producto){
        if(!this.carrito.includes(producto._id) ){
          this.carrito.push(producto)
          localStorage.setItem("carrito",JSON.stringify(this.carrito))
        }
        producto.disponibles -= 1;
        this.precioTotal += producto.precio;
        producto.disponibles;
      },

      sacarCar(producto) {
        console.log(producto);
        let indice = this.carrito.findIndex(productoCarrito => productoCarrito._id == producto._id)
        this.carrito.splice(indice, 1)
        
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
        producto.disponibles += 1
        this.precioTotal-=producto.precio
      },

      formatNumber(number) {
        return number.toLocaleString("De-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
       
  },
}).mount("#app");
