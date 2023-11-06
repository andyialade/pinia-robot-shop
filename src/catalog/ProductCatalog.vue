<template>
  <div>
    <h2 v-if="productStore.productsLoading">Product data is loading...</h2>
    <ul class="products">
      <li class="product-item" v-for="(product, index) in productStore.products" :key="index">
        <ProductInfo :product="product">
          <button class="cta" @click="addToCart(product)">Buy</button>
        </ProductInfo>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ProductInfo from './product-info/ProductInfo.vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

const cartStore = useCartStore()
const productStore = useProductStore()

const { addToCart } = cartStore

productStore.getProducts()

// function addToCart(product) {
//   cartStore.productIds.push(product.id)

//   //Use Patch When updating multiple items in store
//   //const newCart = [...cartStore.cart, product]
//   // cartStore.cart = newCart
//   // cartStore.$patch({
//   //   cart: newCart,
//   // })
// }
</script>

<style scoped>
.products {
  margin: 0 100px;
}

.product-item {
  border-bottom: 2px solid #999;
}
</style>