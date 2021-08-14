export const displayUserInfo = (nomeP, photoPerfil) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      nomeP.innerHTML = user.displayName;
      photoPerfil.src = user.photoURL;
    } else {
      nomeP.innerHTML = user.email;
      photoPerfil.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    }
  });
};

export const postsCollection = firebase.firestore().collection('posts');



export const postData = () => {
  const data = new Date();
  return data.toLocaleString('pt-BR');
};

export const getPostStructure = (text, url) => {
  const post = {
    text: text,
    url: url,
    user_id: currentUserEmail,
    data: postData(),
    likes: [],
    comments: [],
  };
  return post;
};
