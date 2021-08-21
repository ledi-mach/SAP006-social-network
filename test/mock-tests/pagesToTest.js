import {
  getTheRoad, loginWithEmailAndPassword, loginWithGoogle, resetPassword, registerAccount,
} from '../../src/lib/auth.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'login-container';
  rootElement.innerHTML = `
  <section class="login-left-section">
    <header>
      <a>Sobre nós</a>
    </header>
    <main>
      <div>
        <img src="./images/logo-login.png"/>
      </div>
      <form>
        <div class="div-email" id="div-email">
          <input required type="email" class="input-email" id="input-email">
          <label class="login-input-label" id="label-input-email">Email</label>
        </div>
        <div class="div-password" id="div-password">
          <input required type="password" class="input-password" id="input-password">
            <img class="eye" id="eye" src="./images/eye-off.png"/>
            <label class="login-input-label">Senha</label> 
          <br>
          <label class="checkbox-keep-logged-in"> Mantenha-me logadex
            <input type="checkbox" id="checkbox-keep-logged-in">
          </label>
        </div>
      </form>
      <div class="login-error-div" id="print-error-here"> 
        <p class="transparent"> . </p>
      </div>
      <div class="login-btn-sig-log">
        <button id="btn-login" class="btn-login">ENTRAR</button>  
        <button id="btn-sign-in">CADASTRAR</button>
      </div>
      <div class="login-additionals">
        <button id="btn-login-with-google"> Ou conecte-se com o gmail</button>
        <br>
        <button id="btn-forgot-password"> Esqueceu a senha?</button>
      </div>
    </main>
    <footer> Willing &copy 2021</footer>
  </section> 
  `;

  const getUserEmail = rootElement.querySelector('#input-email');
  const getUserPassword = rootElement.querySelector('#input-password');
  const checkboxKeepLoggedIn = rootElement.querySelector('#checkbox-keep-logged-in');

  const btnSignIn = rootElement.querySelector('#btn-sign-in');
  btnSignIn.addEventListener('click', () => {
    getTheRoad('/register');
  });

  const btnLoginWithGoogle = rootElement.querySelector('#btn-login-with-google');
  btnLoginWithGoogle.addEventListener('click', () => {
    loginWithGoogle(checkboxKeepLoggedIn);
  });

  const btnLogin = rootElement.querySelector('#btn-login');
  btnLogin.addEventListener('click', () => {
    const userEmail = getUserEmail.value;
    const userPassword = getUserPassword.value;
    loginWithEmailAndPassword(userEmail, userPassword, checkboxKeepLoggedIn);
  });

  const btnResetPassword = rootElement.querySelector('#btn-forgot-password');
  btnResetPassword.addEventListener('click', () => {
    const userEmail = getUserEmail.value;
    resetPassword(userEmail);
  });

  return rootElement;
};

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('register-container');
  rootElement.innerHTML = `
  <section class="login-left-section">
    <header class="login-left-section-header">
      <a>Sobre nós</a>
    </header>
    <main>
      <div>
        <img class="img-logo" src="./images/logo-login.png"/>
      </div>
      <form>
        <div>
          <input required type="text" id="input-name">
          <label class="login-input-label">Nome</label>
        </div>
        <div>
          <input required type="email" id="input-email">
          <label class="login-input-label" id="label-input-email">Email</label>
        </div>
        <div class="div-password" id="div-password">
          <input required type="password" id="input-password">
          <img class="icon-eye" id="icon-eye" src="./images/eye-off.png"/>
          <label class="login-input-label">Senha</label> 
        </div>
        <label class="checkbox-keep-logged-in"> Mantenha-me logadex
          <input type="checkbox" id="checkbox-keep-logged-in">
        </label>
      </form>
      <div id="print-error-here"> 
        <p class="transparent"> . </p>
      </div>
      <div class="login-btn-sig-log register-btn-register">
        <button id="btn-register-account">REGISTRAR</button>
      </div>
    </main>
    <footer class="register-footer"> Willing &copy 2021</footer>
  </section> 
`;
  const getUserEmail = rootElement.querySelector('#input-email');
  const getUserPassword = rootElement.querySelector('#input-password');

  const registerAccountBtn = rootElement.querySelector('#btn-register-account');
  registerAccountBtn.addEventListener('click', () => {
    const userName = rootElement.querySelector('#input-name').value;
    const userEmail = getUserEmail.value;
    const userPassword = getUserPassword.value;
    const checkboxKeepLoggedIn = rootElement.querySelector('#checkbox-keep-logged-in');
    registerAccount(userEmail, userPassword, userName, checkboxKeepLoggedIn);
  });

  return rootElement;
};
