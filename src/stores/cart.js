import { defineStore, acceptHMRUpdate } from "pinia"
import { ref, computed } from 'vue'
import { useProductStore } from './product'

export const useCartStore  = defineStore('cart', () => {
    const productStore = useProductStore()

    const productIds = ref([])
    const cart = computed(() => productIds.value.map(id => productStore.products.find(p => p.id === id)))
    const cartTotal = computed(() => cart.value.reduce((prev, cur) => prev += cur.price, 0))

    function removeFromCart(product){
        const itemIndex = productIds.value.findIndex(id => id === product.id)
        productIds.value.splice(itemIndex, 1)
    }

    function addToCart(product){
        productIds.value.push(product.id)
    }

    return {
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
    }
})


if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}