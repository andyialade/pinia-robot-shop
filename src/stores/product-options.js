import { defineStore, acceptHMRUpdate } from "pinia"

export const useProductStore  = defineStore('product', {
    //const products = ref([])
    // const products = useLocalStorage('productStore-products', [])
    // const productsLoading = ref([])

    // async function getProducts() {
    //     const response = await fetch('/api/products')
    //     products.value = await response.json()
    // }

    // return {
    //     products,
    //     getProducts,
    //     productsLoading,
    // }

    state: () => ({
        products: [],
        productsLoading: false,
    }),
    actions: {
        async getProducts() {
            const response = await fetch('/api/products')
            const returnedProducts = await response.json()

            this.products = returnedProducts
            return returnedProducts 
        },
    },
    cache: { getProducts: { stateKey: 'products', loadingStateKey: 'productsLoading' } },
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
