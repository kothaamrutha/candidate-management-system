import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

export const fetchAll = () => dispatch => {
    api.dCandidate().fetchAll()
    .then( response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    })
    .catch( err => console.log(err))
}

export const addOrEdit = (formData) => dispatch => {
    const apiCall = formData.id
        ? api.dCandidate().update(formData.id, formData)
        : api.dCandidate().create(formData)

    apiCall
    .then( response => {
        dispatch({
            type: formData.id ? ACTION_TYPES.UPDATE : ACTION_TYPES.CREATE,
            payload: formData.id ? formData : response.data
        })
    })
    .catch( err => console.log(err))
}

export const Delete = (id) => dispatch => {
    api.dCandidate().delete(id)
    .then( response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
    })
    .catch( err => console.log(err))
}