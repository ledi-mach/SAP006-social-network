/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { getTheRoad, logOut, sendImageToDatabase } from '../../lib/auth.js';
import { editPost, getPosts, deletePost } from './services.js';
import {
  updateLikes, getComments, getCurrentCommentsToComment, getCurrentCommentLikes,
  getCurrentCommentsToDelete,
} from './data.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'feed-container';
  rootElement.innerHTML = `
  <main class="all-container" id="all-container">
    <div class="feed-left-section">
      <aside>  
        <section class='profile-area'>
          <div class='div-perfil'>
            <img src='imagens/user.png' id='photo' class='photo feed-user-photo'>
            <div class = "feed-welcome-user">
              <p> Bem vinda </p>
              <p class='name-user' id="name-user"></p> 
            </div>
          </div>
        </section>
        <div class="feed-settings-container">
          <div class="feed-settings">
            <img src="./images/home-icon.png" alt="">
            <button class="text-icon" id=""> Início </button>
          </div>
          <div class="feed-settings">
            <img src="./images/config-icon.png" alt="">
            <button class="perfil-icon text-icon" id="perfil-icon"> Perfil </button>
          </div>
          <div class="feed-settings">
            <img src="./images/dark-icon.png" alt="">
            <button class="text-icon" id="button-dark"> Modo Escuro </button>
          </div>
          <div class="feed-settings">
            <img src="./images/out-icon.png" alt="">
            <button class="text-icon" id="button-signout"> Sair </button>
          </div>
        </div>
      </aside>
    </div>
    <div class="feed-right-section">
      <form>
        <input class="feed-search-input" placeholder="Busca"> </input>
      </form>
      <div class="wrap">
  
      <div class="container-carousel">
      
        <span id="previous"><i data-feather="chevron-left"> < </i></span>
        <span id="next"><i data-feather="chevron-right">  > </i></span>
        <div id="slider" class="slider">
        <a href="https://blog.bonitour.com.br/confira-os-4-melhores-lugares-para-praticar-mergulho-no-brasil/"> <img class="pictures" src="./images/stories/1.png"></img></a>
        <img class="pictures" src="./images/stories/2.png"></img>
        <img class="pictures" src="./images/stories/3.png"></img>
        <img class="pictures" src="./images/stories/4.png"></img>
        <img class="pictures" src="./images/stories/5.png"></img>
        <img class="pictures" src="./images/stories/6.png"></img>
        <img class="pictures" src="./images/stories/7.png"></img>
        <img class="pictures" src="./images/stories/8.png"></img>
        <img class="pictures" src="./images/stories/9.png"></img>
        <img class="pictures" src="./images/stories/10.png"></img>
        <img class="pictures" src="./images/stories/11.png"></img>
        </div>
      </div>
  
    </div>
        <form action = "" id="postForm" class="publication-form">
          <textarea class="feed-text-area" id='postText' placeholder='O que você quer compartilhar?'></textarea>
          <input class="feed-hide-url" id="hide-url"> </input>
          <div class='share-area-buttons'>
          <button id='publish-img-btn' class='circle violet'>📷</button>
          <div class='publish-img-form-box transparency'>
            <form method="post">
              <input type="file" id="image_uploads" class='share-area-img-btn' accept=".jpg, .jpeg, .png">
             </form>
          </div>
          <button id='publicar'>Publicar</button>
        </form>
      </div>
      <section id='postado' class='posts-container'> </section>
    </div>
  </main>
  `;

  const showUrlOfImagesToPublish = (urlFile) => {
    rootElement.querySelector('#hide-url').value = `${urlFile}`;
    rootElement.querySelector('#postText').placeholder = 'O que você quer compartilhar?';
  };

  const uploadImage = () => {
    rootElement.querySelector('.publish-img-form-box').style.opacity = 1;
    rootElement.querySelector('#image_uploads').onchange = (event) => {
      sendImageToDatabase(event.target.files[0], showUrlOfImagesToPublish);
      rootElement.querySelector('.publish-img-form-box').style.opacity = 0;
      rootElement.querySelector('#postText').placeholder = 'Imagem carregada';
    };
  };

  const imageToUpload = rootElement.querySelector('#image_uploads');

  const getUpLoadImgClick = () => {
    rootElement.querySelector('#publish-img-btn').addEventListener('click', () => {
      uploadImage();
      imageToUpload.style.opacity = 1;
    });
  };
  getUpLoadImgClick();

  const perfil = rootElement.querySelector('.perfil-icon');
  perfil.addEventListener('click', (event) => {
    event.preventDefault();
    getTheRoad('/profile');
  });

  const photoPerfil = rootElement.querySelector('.photo');
  const nomeP = rootElement.querySelector('.name-user');
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      nomeP.innerHTML = user.displayName;
      photoPerfil.src = user.photoURL;
    } else {
      nomeP.innerHTML = user.email;
      photoPerfil.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    }
  });

  const darkMode = () => {
    rootElement.querySelector('#button-dark').addEventListener('click', () => {
      const change = rootElement.querySelector('#all-container');
      const changeAside = rootElement.querySelector('aside');
      const changeFeed = rootElement.querySelector('.feed-left-section');
      change.style.background = 'rgb(30, 35, 41)';
      changeAside.style.background = 'rgb(19, 22, 26)';
      changeFeed.style.background = 'rgb(19, 22, 26)';
    });
  };
  darkMode();

  const postsCollection = firebase.firestore().collection('posts');
  const currentUserEmail = firebase.auth().currentUser.email;
  //  Função para adicionar os posts no firebase e printar na tela:
  rootElement.querySelector('#postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const postText = rootElement.querySelector('#postText');
    const text = rootElement.querySelector('#postText').value;
    const url = rootElement.querySelector('#hide-url').value;
    const postData = () => {
      const data = new Date();
      return data.toLocaleString('pt-BR');
    };

    const post = {
      text: text,
      url:url,
      user_id: currentUserEmail,
      data: postData(),
      likes: [],
      comments: [],
    };

    if (postText.value === '') {
      return;
    }
    postsCollection.add(post).then(() => {
      rootElement.querySelector('#postText').value = '';
      rootElement.querySelector('#postado').innerHTML = '';
      loadPosts();
    });
  });

  // Printa todos os posts existentes na tela:
  function createPostTemplate(post) {
    const postTemplate = `
          <p class="user-post"> ${post.data().user_id} <br>${post.data().data} </p>
          <div class="data-post-id" data-postid="${post.id}" data-postOwner="${post.data().user_id}">
          ${((user) => {
    if (user === currentUserEmail) {
      return `<button type="submit" data-editPostButton="${post.id}" class="btn-edit">Editar</button>`;
    } return `<button type="submit" data-editPostButton="${post.id}" class="btn-edit" hidden>Editar</button>`;
  })(post.data().user_id)}
            <button type="submit" data-cancelEditionPostButton="${post.id}" class="btn-cancel-edit" hidden> Cancelar</button>
            <button type="submit" data-saveEditionPostButton="${post.id}" class="btn-edit-save" hidden> Salvar </button>
          </div>
          <p class="txt"> ${post.data().text} </p>
          <textarea class='edit-text-area' data-edit-text-area='${post.id}' hidden>${post.data().text}</textarea>
          ${((url) => {
    if (url !== '') {
      return `<img class="img-po" src="${post.data().url}"> </img>`;
    } return `<img id="hide-img" src="${post.data().url}"> </img>`;
  })(post.data().url)}
          <section class="likes-comments-bar">
          ${((user) => {
    if (user === currentUserEmail) {
      return `<button type="submit" data-deletePostButton="${post.id}" class="delete-button"> Deletar</button>`;
    } return `<button type="submit" data-deletePostButton="${post.id}" class="delete-button" hidden> Deletar</button>`;
  })(post.data().user_id)}
          <section class="anim-like"id="anim-like" >
          </section> 
          <button class="like-btn" id="like-btn" data-likePostButton = "${post.id}"> </button> 
            ${((quantityOfLikes) => {
    if (quantityOfLikes === 1) {
      return `<p class="f-20 like-value" data-likes-id="${post.id}"> 
                <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> 
                <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtida </span> 
              </p>`;
    } if (quantityOfLikes > 1) {
      return `<p class="f-20 like-value" data-likes-id="${post.id}">
                <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> 
                <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtidas </span> 
              </p>`;
    } return `<p class="f-20 like-value" data-likes-id="${post.id}"> 
                <span data-like-value-to-be-changed="${post.id}"> ${0} </span>
                <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtidas </span> 
              </p>`;
  })(post.data().likes.length)}
          </section>
          <div class="comments">
            <input required data-commentPostInput="${post.id}" placeholder='O que você quer comentar?'></input>
            <button data-commentPostButton="${post.id}"> Comentar </button> 
            <button data-showComments = ${post.id}> Mostrar Comentarios </button>
            <ul data-commentPostUl="${post.id}"> </ul>
        </div>
        <div class="comments">
          <ul data-comment-post-id="${post.id}"> </ul>
        </div>
      </div>
      `;

    return postTemplate;
  }

  function createAndPrintAllPosts(post) {
    const postElement = document.createElement('div');
    postElement.id = post.id;
    postElement.classList.add('div-postados');
    rootElement.querySelector('#hide-url').value = '';
    const postTemplate = createPostTemplate(post);
    postElement.innerHTML = postTemplate;
    const showheat = postElement.querySelector('#like-btn');
    showheat.addEventListener('click', () => {
      const element = postElement.querySelector('.anim-like'); element.style.opacity = 1;
    });
    rootElement.querySelector('#postado').appendChild(postElement);
  }

  function loadPosts() {
    getPosts(createAndPrintAllPosts);
  }

  // Adição dos eventos dos botões:
  const postsContainer = rootElement.querySelector('.posts-container');
  // eslint-disable-next-line consistent-return
  postsContainer.addEventListener('click', (e) => {
    const { target } = e;
    const postID = target.parentNode.parentNode.id;
    const postIDForComments = target.parentNode.parentNode.parentNode.parentNode.id;
    const printComments = (commentsToPrint, parentID) => {
      const commentArea = rootElement.querySelector(`[data-commentPostUl="${parentID}"]`);
      commentArea.innerHTML = '';
      commentsToPrint.forEach((comment) => {
        const newItem = `
            <li class="comment-f-20" id="${comment.id}">
              <p> Comentários: <br> ${comment.owner} <br> ${comment.content}</p>;
              <button data-likeCommentButton="${comment.id}"> Curtir </button> ;
              ${((user) => {
    if (user === currentUserEmail) {
      return `<button data-deleteCommentButton="${comment.id}"> Deletar </button>`;
    } return `<button data-deleteCommentButton="${comment.id}" hidden> Deletar </button>`;
  })(comment.owner)}
            ${((quantityOfLikes) => {
    if (quantityOfLikes === 1) {
      return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> <span data-comment-likes-text-to-be-changed="${comment.id}"> ❤️ Curtida </span> </p>`
    } if (quantityOfLikes > 1) {
      return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> <span data-comment-likes-text-to-be-changed="${comment.id}"> ❤️ Curtidas </span> </p>`
    }
    return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${0} </span> <span data-comment-likes-text-to-be-changed="${comment.id}"> ❤️ Curtidas </span> </p>` 
  })(comment.commentLikes.length)}
            `;
        commentArea.innerHTML += newItem;
      });
    };

    //  Edit Post:
    const editButton = target.dataset.editpostbutton;
    if (editButton) {
      rootElement.querySelector(`[data-editPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-cancelEditionPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-saveEditionPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-edit-text-area="${postID}"]`).hidden = false;
    }

    const cancelEditionButton = target.dataset.canceleditionpostbutton;
    if (cancelEditionButton) {
      rootElement.querySelector(`[data-editPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-cancelEditionPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-saveEditionPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-edit-text-area="${postID}"]`).hidden = true;
    }

    const saveEditionButton = target.dataset.saveeditionpostbutton;
    if (saveEditionButton) {
      const newText = rootElement.querySelector(`[data-edit-text-area="${postID}"]`).value;
      editPost(newText, postID);
      rootElement.querySelector('#postado').innerHTML = '';
      loadPosts();
    }

    // Delete Post:
    const deleteButton = target.dataset.deletepostbutton;
    if (deleteButton) {
      const deleteConfirmation = confirm('Você realmente gostaria de deletar este post?');
      if (deleteConfirmation) {
        rootElement.querySelector('#postado').innerHTML = '';
        deletePost(postID, loadPosts);
      } else {
        return false;
      }
    }

    // Like Post:
    const likeButton = target.dataset.likepostbutton;
    if (likeButton) {
      const valueToBeChanged = rootElement.querySelector(`[data-like-value-to-be-changed="${postID}"]`);
      const textToBeChanged = rootElement.querySelector(`[data-like-text-to-be-changed="${postID}"]`);
      const amountOfLikes = parseInt(valueToBeChanged.textContent, 10);
      updateLikes(postID, currentUserEmail, valueToBeChanged, textToBeChanged, amountOfLikes);
    }

    //  Show Post Comments:
    const showCommentsButton = target.dataset.showcomments;
    if (showCommentsButton) {
      getComments(postID, printComments);
    }

    // Comment Post:
    const commentButton = target.dataset.commentpostbutton;
    if (commentButton) {
      const newCommentInput = rootElement.querySelector(`[data-commentPostInput="${postID}"]`);
      const newCommentText = newCommentInput.value;
      getCurrentCommentsToComment(postID, newCommentText,
        currentUserEmail, printComments);
    }

    // Like Post Comment:
    const likeCommentButton = target.dataset.likecommentbutton;
    if (likeCommentButton) {
      const commentID = target.dataset.likecommentbutton;
      const valueToBeChanged = rootElement.querySelector(`[data-comment-likes-value-to-be-changed="${commentID}"]`);
      const textToBeChanged = rootElement.querySelector(`[data-comment-likes-text-to-be-changed="${commentID}"]`);
      const amountOfLikes = parseInt(valueToBeChanged.textContent, 10);
      getCurrentCommentLikes(postIDForComments, currentUserEmail, commentID,
        valueToBeChanged, textToBeChanged, amountOfLikes);
    }

    // Delete Post Comment:
    const deleteCommentButton = target.dataset.deletecommentbutton;
    if (deleteCommentButton) {
      const commentID = target.dataset.deletecommentbutton;
      const deleteConfirmation = confirm('Você realmente gostaria de deletar este Comentário?');
      if (deleteConfirmation) {
        getCurrentCommentsToDelete(postIDForComments, commentID, printComments);
      } else {
        return false;
      }
    }
  });

  // Sign Out
  const btnSignOut = rootElement.querySelector('#button-signout');
  btnSignOut.addEventListener('click', logOut);

  // Slider Bolinhas
  const nextEl = rootElement.querySelector('#next');
  const previousEl = rootElement.querySelector('#previous');
  const sliderEl = rootElement.querySelector('#slider');

  function onNextClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft += imgWidth;
  }

  function onPreviousClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= imgWidth;
  }

  nextEl.addEventListener('click', onNextClick);
  previousEl.addEventListener('click', onPreviousClick);

  loadPosts();
  return rootElement;
};
