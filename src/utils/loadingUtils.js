// src/utils/loadingUtils.js
import store from '../redux/store' // You'll need to create this
import { setLoaderLoading } from '../redux/slices/loaderSlice'

export const startLoading = () => {
  store.dispatch(setLoaderLoading(true))
}

export const stopLoading = () => {
  store.dispatch(setLoaderLoading(false))
}
