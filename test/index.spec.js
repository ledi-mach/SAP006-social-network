/**
* @jest-environment jsdom
*/
import * as auth from '../src/lib/auth.js';
import { Login } from '../src/pages/login/login.js';
import {
  loginWithGoogle,
  loginWithEmailAndPassword,
}
  from '../src/lib/auth.js';

jest.mock('../src/lib/auth.js');

describe('Render página de login', () => {
  it('carrega a página', () => {
    expect(Login()).toMatchSnapshot();
  });
  it('click no botão de login com o Google', () => {
    loginWithGoogle.mockResolvedValueOnce(true);
    const pageLogin = Login();
    pageLogin.querySelector('#btn-login-with-google').dispatchEvent(new Event('click'));
    expect(auth.loginWithGoogle).toBeCalled();
  });
});

describe('loginEmailAndPassword', () => {
  it('deve logar com email e senha', () => {
    loginWithEmailAndPassword.mockResolvedValueOnce(true);
    const pageLogin = Login();
    pageLogin.querySelector('#input-email').value = 'teste@teste.com';
    pageLogin.querySelector('#input-password').value = '12345678';
    const checkboxKeepLoggedIn = pageLogin.querySelector('#checkbox-keep-logged-in');
    pageLogin.querySelector('#btn-login').dispatchEvent(new Event('click'));
    expect(auth.loginWithEmailAndPassword).toBeCalled();
    expect(auth.loginWithEmailAndPassword).toHaveBeenCalledWith('teste@teste.com', '12345678', checkboxKeepLoggedIn);
  });
});
