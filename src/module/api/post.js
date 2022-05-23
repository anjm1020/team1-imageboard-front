import axios from "axios";

const getList = (payload) => axios({
    url: '/api/posts/?page='+payload.pageNumber+'&size=10',
    method: 'get',
    headers: {
        "Authorization":payload.token
    }
});

const getPost = (payload) => axios({
    url: '/api/posts/'+payload.postId,
    method: 'get',
    headers: {
        "Authorization":payload.token
    }
});

const createPost = (payload) => axios({
    url: '/api/posts/',
    method: 'post',
    data: {
        userId : payload.post.userId,
        title : payload.post.title,
        content : payload.post.content,
        imageName: payload.post.imageName,
        file : payload.post.file
    },
    headers: {
        "Authorization":payload.token,
        'Content-Type': 'multipart/form-data',
    }
});

const updatePost = (payload) => axios({
    url: '/api/posts/'+payload.post.id,
    method: 'PUT',
    data: {
        userId : payload.post.userId,
        title : payload.post.title,
        content : payload.post.content,
        imgId : payload.post.imgId,
    },
    headers: {
        "Authorization":payload.token,
    }
});

const deletePost = (payload) => axios({
    url: '/api/posts/'+payload.postId,
    method: 'delete',
    headers: {
        "Authorization":payload.token,
    }
});

export default {
    getList,
    getPost,
    createPost,
    updatePost,
    deletePost
}