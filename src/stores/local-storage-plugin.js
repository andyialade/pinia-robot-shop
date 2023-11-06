export default function localStoragePlugin({store, options}){
    store.$subscribe((mutation, state) => {
        for(const propertyName in state){
            const key = `${store.cacheKeyPrefix}-${mutation.storeId}-${propertyName}`
            localStorage.setItem(key, JSON.stringify(state[propertyName]))
        }
    })
    
    store.$onAction(({name, store, after, onError}) => {
        if(options.cache && options.cache[name]){
            const loadingKeyName = options.cache[name].loadingStateKey
            store[loadingKeyName] = true
            after(() => { store[loadingKeyName] = false })
            onError(() => { store[loadingKeyName] = false })
        }
    })

    const wrappedActions = {}
    if(options.cache){
        for(const actionToCache in options.cache){
            const originalAction = store[actionToCache]
            const newAction = () => {
                const stateKey = options.cache[actionToCache].stateKey
                const key = `${store.cacheKeyPrefix}-${store.$id}-${stateKey}`
                const cachedData = localStorage.getItem(key)
                if(cachedData){
                    store[stateKey] = JSON.parse(cachedData)
                }
                else{
                    originalAction.apply(null, arguments)  
                }
            }
            wrappedActions[actionToCache] = newAction
        }
    }

    return {
        cacheKeyPrefix: 'robot-shop',
        ...wrappedActions,
    }
}