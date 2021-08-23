/**
* @jest-environment jsdom
*/
import * as auth from '../../src/lib/auth.js';
import { Login } from './loginTest.js';

jest.mock('../../src/lib/auth.js');
const pageLogin = Login();

describe('Render página de login', () => {
  it('carrega a página', () => {
    expect(Login()).toMatchSnapshot();
  });
  it('click no botão de login com o Google', () => {
    auth.loginWithGoogle.mockResolvedValueOnce(true);
    pageLogin.querySelector('#btn-login-with-google').dispatchEvent(new Event('click'));
    expect(auth.loginWithGoogle).toBeCalled();
  });
});

describe('loginEmailAndPassword', () => {
  it('deve logar com email e senha', () => {
    auth.loginWithEmailAndPassword.mockResolvedValueOnce(true);
    pageLogin.querySelector('#input-email').value = 'teste@teste.com';
    pageLogin.querySelector('#input-password').value = '12345678';
    const checkboxKeepLoggedIn = pageLogin.querySelector('#checkbox-keep-logged-in');
    pageLogin.querySelector('#btn-login').dispatchEvent(new Event('click'));
    expect(auth.loginWithEmailAndPassword).toBeCalled();
    expect(auth.loginWithEmailAndPassword).toHaveBeenCalledWith('teste@teste.com', '12345678', checkboxKeepLoggedIn);
  });
});

describe('resetPassword', () => {
  it('Deverá enviar um e-mail ao usuário para a restauração de senha.', () => {
    auth.resetPassword.mockResolvedValueOnce(true);
    pageLogin.querySelector('#input-email').value = 'teste@teste.com';
    pageLogin.querySelector('#btn-forgot-password').dispatchEvent(new Event('click'));
    expect(auth.resetPassword).toBeCalled();
    expect(auth.resetPassword).toHaveBeenCalledWith('teste@teste.com');
  });
});
