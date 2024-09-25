import { getToken, renderApp, posts } from "../index.js";
import { setLike, removeLike } from "../api.js";

export const likeEventListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const postId = likeButton.dataset.postId;
            const index = likeButton.dataset.index;

            if (posts[index].isLiked) {
                removeLike({ token: getToken(), postId })
                    .then(() => {
                        posts[index].isLiked = false;
                    })
                    .then(() => {
                        renderApp();
                    })
            } else {
                setLike({ token: getToken(), postId })
                    .then(() => {
                        posts[index].isLiked = true;
                    })
                    .then(() => {
                        renderApp();
                    })
            }
        });
    });
};