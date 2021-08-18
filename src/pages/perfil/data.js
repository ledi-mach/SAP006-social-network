<<<<<<< HEAD
import {
  likePost, commentPost, showComments, likePostComment, deletePostComment,
} from './services.js';

export const updateLikes = async (postID, currentUserEmail, valueToBeChanged,
  textToBeChanged, amountOfLikes) => {
  likePost(postID, currentUserEmail);
  const resultado = await likePost(postID, currentUserEmail);
  if (resultado === 'like') {
    const newAmountOflikes = amountOfLikes + 1;
    valueToBeChanged.innerHTML = `${newAmountOflikes}`;
    if (newAmountOflikes === 1) {
      textToBeChanged.innerHTML = 'Curtida';
    } else {
      textToBeChanged.innerHTML = 'Curtidas';
    }
  } else {
    const newAmountOflikes = amountOfLikes - 1;
    valueToBeChanged.innerHTML = `${newAmountOflikes}`;
    if (newAmountOflikes === 1) {
      textToBeChanged.innerHTML = 'Curtida';
    } else {
      textToBeChanged.innerHTML = 'Curtidas';
    }
  }
=======
import { getTheRoad } from '../../lib/auth.js';
import { getError } from '../../lib/errors.js';

export const updateUserProfile = (name, url) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name,
    photoURL: url,
  }).then(() => {
    console.log('Perfil atualizado');
  }).catch((error) => {
    getError(error);
  });
>>>>>>> cac7525c80d9eb030574f35166408fb33eed129e
};

export const getComments = async (postID, printComments) => {
  const currentComments = await showComments(postID);
  printComments(currentComments, postID);
}; 

export const getCurrentCommentsToComment = async (postID, newCommentText, currentUserEmail,
  printComments) => {
  commentPost(postID, newCommentText, currentUserEmail);
  const currentComments = await commentPost(postID, newCommentText, currentUserEmail);
  printComments(currentComments, postID);
};

export const getCurrentCommentLikes = async (postIDForComments, currentUserEmail, commentID,
  valueToBeChanged, textToBeChanged, amountOfLikes) => {
  likePostComment(postIDForComments, commentID, currentUserEmail);
  const likeOrDeslike = await likePostComment(postIDForComments, commentID, currentUserEmail);
  if (likeOrDeslike === 'like') {
    const newAmountOflikes = amountOfLikes + 1;
    valueToBeChanged.innerHTML = `${newAmountOflikes}`;
    if (newAmountOflikes === 1) {
      textToBeChanged.innerHTML = 'Curtida';
    } else {
      textToBeChanged.innerHTML = 'Curtidas';
    }
  } else {
    const newAmountOflikes = amountOfLikes - 1;
    valueToBeChanged.innerHTML = `${newAmountOflikes}`;
    if (newAmountOflikes === 1) {
      textToBeChanged.innerHTML = 'Curtida';
    } else {
      textToBeChanged.innerHTML = 'Curtidas';
    }
  }
};

export const getCurrentCommentsToDelete = async (postIDForComments, commentID, printComments) => {
  deletePostComment(postIDForComments, commentID);
  const currentComments = await deletePostComment(postIDForComments, commentID);
  printComments(currentComments, postIDForComments);
};
