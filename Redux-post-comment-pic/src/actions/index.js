import axios from 'axios';
import * as firebase from 'firebase';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';


export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

var config = {
    apiKey: 'AIzaSyColWfu2Xp2eW6Qq7SyueuI0zkGx56bGJw',
    authDomain: 'react-add-ict.firebaseapp.com',
    databaseURL: 'https://react-add-ict.firebaseio.com',
    projectId: 'react-add-ict',
    storageBucket: 'react-add-ict.appspot.com',
    messagingSenderId: '865167814872'
  };
  
firebase.initializeApp(config);
  

const postsRef = firebase.database().ref().child('posts');
const storage = firebase.storage();

export function fetchPost(id) {
    return {
        type: FETCH_POST,
        payload: postsRef.child(id).once('value')
    }
}


export function fetchPosts() {
    return {
        type: FETCH_POSTS,
        payload: postsRef.once('value')
    }
}

export function createPost(props) {

    var uid = 1;
    var newPostKey = postsRef.push().key;

    if ( props.image && props.image.length > 0) {
        console.log('image :', props.image[0]);
        const imageName = `${newPostKey}_${props.image[0].name}`
        const postStorageRef = storage.ref(`/post/${imageName}`);
        
        const updateTask = postStorageRef.put(props.image[0]);
    
        updateTask.on('state_changed', function (snapshot) {
            console.log('state_change first function', snapshot);
        }, function(err) {
            
        }, function() {
            var downloadUrl = updateTask.snapshot.downloadURL;
    
            console.log('downlaod URL:', downloadUrl);  
            updates['/posts/' + newPostKey].image = downloadUrl;
            updates['/posts/' + newPostKey].imageName = imageName;
            updates['/posts/' + newPostKey].comments = {};
            
            firebase.database().ref().update(updates)
        })

    }
    props.image = '';
    props.time = new Date().valueOf();

    

    props['id'] = newPostKey;
    var updates = {};
    updates['/posts/' + newPostKey] = props;
    // updates['/user-posts/' + uid + '/' + newPostKey] = props;
  
    return {
        type: CREATE_POST,
        payload: firebase.database().ref().update(updates)
    };
}

export function deletePost(post) {
    console.log('deleting')

    if (post.image) {
        storage.ref(`/post/${post.imageName}`).delete();
    }
    
    return {
        type: DELETE_POST,
        payload: postsRef.child(post.id).remove()
    }
}


export function createComment(id, props) {
    console.log('createComment inside : ', props.comment)
    props.uid = 1
    props.time = new Date().valueOf();
    props.comment_id = `${props.uid}_${props.time}`
    var updates = {};

    updates[`/posts/${id}/comments/${props.comment_id}`] = props;
    

    return {
        type: CREATE_COMMENT,
        payload: firebase.database().ref().update(updates)
    }
}


export function fetchComments(id) {
    return {
        type: FETCH_COMMENTS,
        payload: postsRef.child(id).child('comments').once('value')
    }
}