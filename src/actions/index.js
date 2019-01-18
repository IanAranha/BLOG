import _ from 'lodash';
import JSONPlaceholder from '../apis/JSONPlaceholder'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    console.log("About to fetch posts")
    await dispatch(fetchPosts());
    console.log("Posts fetched")

    //Makes an array of all the posts.
    console.log(getState().posts)

    //Makes an array of all the posts' userId only
    console.log(_.map(getState().posts, 'userId'))

    //makes an array of all unique userIds
    //console.log(_.uniq(_.map(getState().posts, 'userId')))
    //const userIds = (_.uniq(_.map(getState().posts, 'userId')))

    //now that posts are loaded, using the userId, fetch each user.
    //userIds.forEach((id) => {dispatch(fetchUser(id))})
    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((id)=>{dispatch(fetchUser(id))})
    .value()
}

export const fetchPosts = () => async dispatch => {
    console.log("Inner function: starting to fetch posts")
    const response = await JSONPlaceholder.get('/posts');
    

    dispatch({ 
        type: 'FETCH_POSTS',
        payload: response.data
    })
}

    
export const fetchUser = (id) => async dispatch => {
    const response = await JSONPlaceholder.get(`/users/${id}`)

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
}

// const _fetchUser = _.memoize( async(id, dispatch) => {
//     const response = await JSONPlaceholder.get(`/users/${id}`)

//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     })
// })