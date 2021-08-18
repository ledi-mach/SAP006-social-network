export const logOut = () => firebase.auth().signOut();

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};

export const loginWithEmailAndPassword = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);
