export const logOut = () => firebase.auth().signOut();

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};

export const loginWithEmailAndPassword = (email, pass) => firebase
  .auth().signInWithEmailAndPassword(email, pass);

export const updateUserProfile = (name, url) => {
  firebase.auth().updateProfile({
    displayName: name,
    photoURL: url,
  });
};

export const persisteAccount = () => firebase.auth()
  .setPersistence();
