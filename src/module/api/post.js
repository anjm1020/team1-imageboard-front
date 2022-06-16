import axios from "axios";

const getList = (payload) => axios({
    url: '/api/posts/?page='+payload.pageNumber+'&size=10',
    method: 'get',
    headers: {
        "Authorization":payload.token
    }
});

const getLength = (payload) => axios({
    url: '/api/posts/length',
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
        id : payload.post.id,
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

const downloadImage = (payload) => axios({
    url: '/api/images/download/' + payload.imageId,
    method: 'get',
    responseType: 'blob',
    headers: {
        "Authorization": payload.token
    }
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'test.jpeg');
    document.body.appendChild(link);
    link.click();
    link && link.remove();
});

export default {
    getList,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getLength,
    downloadImage
}