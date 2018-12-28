import { Map } from 'immutable'

export const NAMESPACE = 'CARS'
export const SET_FETCHING = `${NAMESPACE} SET_FETCHING`
export const SET_PAGE = `${NAMESPACE} SET_PAGE`
export const SET_CARS = `${NAMESPACE} SET_CARS`
export const SET_RESULTS_COUNT = `${NAMESPACE} SET_RESULTS_COUNT`
export const SET_ERROR = `${NAMESPACE} SET_ERROR`

export const setFetching = fetching => ({
  type: SET_FETCHING,
  fetching: !!fetching
})

export const setPage = (page = 1) => ({
  type: SET_PAGE,
  page
})

export const setCars = (cars = []) => ({
  type: SET_CARS,
  cars
})

export const setResultsCount = (resultsCount = 0) => ({
  type: SET_RESULTS_COUNT,
  resultsCount
})

export const setError = error => ({
  type: SET_ERROR,
  error
})

export const getState = state => state[NAMESPACE]

export const getCars = state => getState(state).cars

export const getPage = state => getState(state).page

export const isFetching = state => getState(state).fetching

export const getPageSize = state => getState(state).pageSize

export const getResultsCount = state => getState(state).resultsCount

export const getTotalPages = state => {
  const resultsCount = getResultsCount(state)
  const pageSize = getPageSize(state)
  const pagesCount = parseInt(resultsCount / pageSize) + ((resultsCount % pageSize) ? 1 : 0)

  return pagesCount || 1
}

export const hasNext = state => {
  const page = getPage(state)
  const totalPages = getTotalPages(state)

  return page < totalPages
}

export const hasPrev = state => getPage(state) > 1

export const defaultState = {
  cars: [],
  carsMap: new Map(),
  fetching: false,
  page: 1,
  resultsCount: 0,
  pageSize: 10,
  error: null
}

export default function reducer (state = defaultState, action = {}) {
  switch (action.type) {
    case SET_FETCHING: {
      state = Object.assign({}, state, {
        fetching: action.fetching
      })
      break
    }

    case SET_PAGE: {
      state = Object.assign({}, state, {
        page: action.page
      })
      break
    }

    case SET_CARS: {
      const { cars } = action
      var carsMap = new Map()
      cars.forEach(car => {
        carsMap = carsMap.set(car.stockNumber, car)
      })

      state = Object.assign({}, state, {
        cars,
        carsMap
      })
      break
    }

    case SET_RESULTS_COUNT: {
      state = Object.assign({}, state, {
        resultsCount: action.resultsCount
      })
      break
    }

    case SET_ERROR: {
      state = Object.assign({}, state, {
        error: action.error
      })
      break
    }
  }

  return state
}
