export const logOut = () => firebase.auth().signOut();

export const loginWithGoogle = () => {
  const provider = firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const loginWithEmailAndPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

export const updateUserProfile = (name, url) => {
  firebase.auth().updateProfile({
    displayName: name,
    photoURL: url,
  });
};

export const persisteAccount = () => firebase.auth()
  .setPersistence();

export const createTemplatePost = (postText) => firebase.firestore().collection('posts').add({
  userName: firebase.auth().currentUser.displayName,
  userEmail: firebase.auth().currentUser.email,
  userUid: firebase.auth().currentUser.userUid,
  text: postText,
  data: new Date().toLocaleString(),
  likes: [],
  comments: [],
});

export const registerAccount = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const editPost = (newText, postID) => {
  firebase.firestore().collection('posts').doc(postID).update({
    text: newText,
  });
};

export const likePost = (postID, currentUserEmail) => firebase.firestore().collection('posts').doc(postID).update({
  likes: firebase.firestore.FieldValue.arrayUnion(currentUserEmail),
});

export const removeLikePost = (postID, currentUserEmail) => firebase.firestore().collection('posts').doc(postID).update({
  likes: firebase.firestore.FieldValue.arrayUnion(currentUserEmail),
});
