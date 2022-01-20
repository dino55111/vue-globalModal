import * as service from './service'
import { defineStore } from 'pinia'
import { useApiStore } from '@/store/useApi'

const useApi = useApiStore()

const state = () => ({
  example: ''
})

const getters = {}

const actions = {
  async GET_EXAMPLE () {
    const result = useApi.API({
      reqContext: service.example()
    }, { root: true })

    this.example = result.data
    return result
  }
}

export const use{{ pascalCase name }} = defineStore('{{pascalCase name}}' ,{
  state,
  getters,
  actions
})
