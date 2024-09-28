import { getToken, renderApp, posts, updatePost } from "../index.js";
import { setLike, removeLike } from "../api.js";

export const likeEventListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const postId = likeButton.dataset.postId;
            const index = likeButton.dataset.index;
            const actionLike = posts[index].isLiked ? removeLike : setLike;

            actionLike({ token: getToken(), postId })
                .then((newPost) => {
                    console.log(newPost)
                    //   posts[index].isLiked = false;
                    updatePost(postId, newPost.post)
                })
                .then(() => {
                    renderApp();
                })
        });
    });
};