const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export { filterChange, filterReducer }