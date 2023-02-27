export const fetchProfileRequest = () => {
  return {
    type: "FETCH_PROFILE_REQUEST",
  };
};

export const fetchProfileSuccess = (profile) => {
  return {
    type: "FETCH_PROFILE_SUCCESS",
    payload: profile,
  };
};

export const fetchProfileFailure = (error) => {
  return {
    type: "FETCH_PROFILE_FAILURE",
    payload: error,
  };
};

export const fetchOtherProfileRequest = (username) => {
  return {
    type: "FETCH_OTHER_PROFILE_REQUEST",
    payload: username,
  };
};

export const fetchOtherProfileSuccess = (profile) => {
  return {
    type: "FETCH_OTHER_PROFILE_SUCCESS",
    payload: profile,
  };
};

export const fetchOtherProfileFailure = (error) => {
  return {
    type: "FETCH_OTHER_PROFILE_FAILURE",
    payload: error,
  };
};

export const updateProfileRequest = () => {
  return {
    type: "UPDATE_PROFILE_REQUEST",
  };
};

export const updateProfileSuccess = (profile) => {
  return {
    type: "UPDATE_PROFILE_SUCCESS",
    payload: profile,
  };
};

export const updateProfileFailure = (error) => {
  return {
    type: "UPDATE_PROFILE_FAILURE",
    payload: error,
  };
};

export const updateAddressRequest = () => {
  return {
    type: "UPDATE_ADDRESS_REQUEST",
  };
};

export const updateAddressSuccess = (profile) => {
  return {
    type: "UPDATE_ADDRESS_SUCCESS",
    payload: profile,
  };
};

export const updateAddressFailure = (error) => {
  return {
    type: "UPDATE_ADDRESS_FAILURE",
    payload: error,
  };
};

export const resetSuccess = () => {
  return {
    type: "RESET_SUCCESS",
  };
};

export const resetSuccessPost = () => {
  return {
    type: "RESET_POST_SUCCESS",
  };
};
export const fetchAuthRequest = () => {
  return {
    type: "FETCH_AUTH_REQUEST",
  };
};

export const fetchLoginSuccess = (accessToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: accessToken,
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};

export const unexpectedError = (error) => {
  return {
    type: "UNEXPECTED_ERROR",
    payload: error,
  };
};

export const fetchLikesRequest = () => {
  return {
    type: "FETCH_LIKES_REQUEST",
  };
};

export const fetchLikesSuccess = (likes) => {
  return {
    type: "FETCH_LIKES_SUCCESS",
    payload: likes,
  };
};

export const fetchLikesFailure = (error) => {
  return {
    type: "FETCH_LIKES_FAILURE",
    payload: error,
  };
};

export const LikePostRequest = () => {
  return {
    type: "LIKES_POST_REQUEST",
  };
};

export const LikePostSuccess = (likes) => {
  return {
    type: "LIKES_POST_SUCESS",
    payload: likes,
  };
};

export const LikePostFailure = (error) => {
  return {
    type: "LIKES_POST_FAILURE",
    payload: error,
  };
};

export const UnlikePostRequest = () => {
  return {
    type: "UNLIKES_POST_REQUEST",
  };
};

export const UnlikePostSuccess = (likes) => {
  return {
    type: "UNLIKES_POST_SUCCESS",
    payload: likes,
  };
};

export const UnlikePostFailure = (error) => {
  return {
    type: "UNLIKES_POST_FAILURE",
    payload: error,
  };
};

export const fetchCommentsRequest = () => {
  return {
    type: "FETCH_COMMENTS_REQUEST",
  };
};

export const fetchCommentsSuccess = (comments) => {
  return {
    type: "FETCH_COMMENTS_SUCCESS",
    payload: comments,
  };
};

export const fetchCommentsFailure = (error) => {
  return {
    type: "FETCH_COMMENTS_FAILURE",
    payload: error,
  };
};

export const CommentPostRequest = () => {
  return {
    type: "COMMENT_POST_REQUEST",
  };
};

export const CommentPostSuccess = (comments) => {
  return {
    type: "COMMENT_POST_FAILURE",
    payload: comments,
  };
};

export const CommentPostFailure = (error) => {
  return {
    type: "COMMENT_POST_FAILURE",
    payload: error,
  };
};

export const UncommentPostRequest = () => {
  return {
    type: "UNCOMMENT_POST_REQUEST",
  };
};

export const UncommentPostSuccess = (comments) => {
  return {
    type: "UNCOMMENT_POST_SUCCESS",
    payload: comments,
  };
};

export const UncommentPostFailure = (error) => {
  return {
    type: "UNCOMMENT_POST_FAILURE",
    payload: error,
  };
};

export const fetchPostsRequest = () => {
  return {
    type: "FETCH_POSTS_REQUEST",
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: "FETCH_POSTS_SUCCESS",
    payload: posts,
  };
};

export const fetchPostsFailure = (error) => {
  return {
    type: "FETCH_POSTS_ERROR",
    payload: error,
  };
};

export const fetchPostByIdRequest = () => {
  console.log("FetchPostById");
  return {
    type: "FETCH_POST_BY_ID_REQUEST",
  };
};

export const fetchPostByIdSuccess = (post) => {
  return {
    type: "FETCH_POST_BY_ID_SUCCESS",
    payload: post,
  };
};

export const fetchPostByIdFailure = (error) => {
  return {
    type: "FETCH_POST_BY_ID_ERROR",
    payload: error,
  };
};

export const resetLoading = () => {
  return {
    type: "RESET_LOADING",
  };
};

export const fetchSignUpSuccess = (isRegistered) => {
  return {
    type: "SIGNUP_SUCCESS",
    payload: isRegistered,
  };
};

export const fetchSignUpFailure = (error) => {
  return {
    type: "SIGNUP_FAILURE",
    payload: error,
  };
};

export const addPostRequest = () => {
  return {
    type: "ADD_POST_REQUEST",
  };
};

export const addPostSuccess = (userPosts) => {
  return {
    type: "ADD_POST_SUCCESS",
    payload: userPosts,
  };
};

export const addPostFailure = (error) => {
  return {
    type: "ADD_POST_ERROR",
    payload: error,
  };
};

export const fetchUserPostsRequest = () => {
  return {
    type: "FETCH_USER_POSTS_REQUEST",
  };
};

export const fetchUserPostsSuccess = (posts) => {
  return {
    type: "FETCH_USER_POSTS_SUCCESS",
    payload: posts,
  };
};

export const fetchUserPostsFailure = (error) => {
  return {
    type: "FETCH_USER_POSTS_FAILURE",
    payload: error,
  };
};

export const fetchFollowsRequest = () => {
  return {
    type: "FETCH_FOLLOWS_REQUEST",
  };
};

export const fetchFollowersSuccess = (followers) => {
  return {
    type: "FETCH_FOLLOWS_SUCCESS",
    payload: followers,
  };
};

export const fetchFollowersFailure = (error) => {
  return {
    type: "FETCH_FOLLOWS_FAILURE",
    payload: error,
  };
};

export const fetchFollowingSuccess = (following) => {
  return {
    type: "FETCH_FOLLOWING_SUCCESS",
    payload: following,
  };
};

export const fetchFollowingFailure = (error) => {
  return {
    type: "FETCH_FOLLOWING_FAILURE",
    payload: error,
  };
};

export const fetchLoggedInUserFollowingSuccess = (following) => {
  return {
    type: "FETCH_LOGGED_IN_USER_FOLLOWING_SUCCESS",
    payload: following,
  };
};

export const fetchLoggedInUserFollowingFailure = (error) => {
  return {
    type: "FETCH_LOGGED_IN_USER_FOLLOWING_FAILURE",
    payload: error,
  };
};

export const followUserRequest = () => {
  return {
    type: "FOLLOW_USER_REQUEST",
  };
};

export const followUserSuccess = (follows) => {
  return {
    type: "FOLLOW_USER_SUCCESS",
    payload: follows,
  };
};

export const followUserFailure = (error) => {
  return {
    type: "FOLLOW_USER_FAILURE",
    payload: error,
  };
};

export const unfollowUserRequest = () => {
  return {
    type: "UNFOLLOW_USER_REQUEST",
  };
};

export const unfollowUserSuccess = (follows) => {
  return {
    type: "UNFOLLOW_USER_SUCCESS",
    payload: follows,
  };
};

export const unfollowUserFailure = (error) => {
  return {
    type: "UNFOLLOW_USER_FAILURE",
    payload: error,
  };
};

export const fetchWhoToFollowRequest = () => {
  return {
    type: "FETCH_WHO_TO_FOLLOW_REQUEST",
  };
};

export const fetchWhoToFollowSuccess = (follows) => {
  return {
    type: "FETCH_WHO_TO_FOLLOW_SUCCESS",
    payload: follows,
  };
};

export const fetchWhoToFollowFailure = (error) => {
  return {
    type: "FETCH_WHO_TO_FOLLOW_FAILURE",
    payload: error,
  };
};

export const fetchMutualsRequest = () => {
  return {
    type: "FETCH_MUTUALS_REQUEST",
  };
};

export const fetchMutualsSuccess = (mutuals) => {
  return {
    type: "FETCH_MUTUALS_SUCCESS",
    payload: mutuals,
  };
};

export const fetchMutualsFailure = (error) => {
  return {
    type: "FETCH_MUTUALS_FAILURE",
    payload: error,
  };
};

export const deletePostRequest = () => {
  return {
    type: "DELETE_POST_REQUEST",
  };
};

export const deletePostSuccess = (userPosts) => {
  return {
    type: "DELETE_POST_SUCCESS",
    payload: userPosts,
  };
};

export const deletePostFailure = (error) => {
  return {
    type: "DELETE_POST_FAILURE",
    payload: error,
  };
};
