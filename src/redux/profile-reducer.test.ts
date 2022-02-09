import profileReducer, {
    addPostActionCreator,
    deletePostActionCreator,
    postType,
    profilePageType
} from "./profile-reducer";

test('new post should be added', () => {

    let action = addPostActionCreator('Test Reducer')

    let state: profilePageType = {
        posts: [
            {id: 1, message: "My first GAV", likesCount: 12},
            {id: 2, message: "Don`t like Myay", likesCount: 10},
            {id: 3, message: "How do you do", likesCount: 16},
        ] as Array<postType>,
        profile: null,
        status: ""
    };

    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[3].message).toBe('Test Reducer')
})

test('one post should be delete', () => {

    let action = deletePostActionCreator(1)

    let state: profilePageType = {
        posts: [
            {id: 1, message: "My first GAV", likesCount: 12},
            {id: 2, message: "Don`t like Myay", likesCount: 10},
            {id: 3, message: "How do you do", likesCount: 16},
        ] as Array<postType>,
        profile: null,
        status: ""
    };

    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(2)
})

test('all posts should be in state after deleted incorrect post', () => {

    let action = deletePostActionCreator(15)

    let state: profilePageType = {
        posts: [
            {id: 1, message: "My first GAV", likesCount: 12},
            {id: 2, message: "Don`t like Myay", likesCount: 10},
            {id: 3, message: "How do you do", likesCount: 16},
        ] as Array<postType>,
        profile: null,
        status: ""
    };

    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
})