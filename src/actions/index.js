import _ from 'lodash';
import JSONPlaceholder from '../apis/JSONPlaceholder'

export const fetchPosts = () => async dispatch => {
        const response = await JSONPlaceholder.get('/posts');

        dispatch({ 
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }

    
export const fetchUser = (id) => dispatch => {
    _fetchUser(id, dispatch);
}

const _fetchUser = _.memoize( async(id, dispatch) => {
    const response = await JSONPlaceholder.get(`/users/${id}`)

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
})