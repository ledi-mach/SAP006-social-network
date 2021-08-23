/**
* @jest-environment jsdom
*/
import * as auth from '../../src/lib/auth.js';
import { Login } from '../../src/pages/login/login.js';
import { Register } from '../../src/pages/register/register.js';
import {
  loginWithGoogle,
  loginWithEmailAndPassword,
  registerAccount,
  resetPassword,
  getTheRoad,
}
  from '../../src/lib/auth.js';

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

describe('resetPassword', () => {
  it('Deverá enviar um e-mail ao usuário para a restauração de senha.', () => {
    resetPassword.mockResolvedValueOnce(true);
    const pageLogin = Login();
    pageLogin.querySelector('#input-email').value = 'teste@teste.com';
    pageLogin.querySelector('#btn-forgot-password').dispatchEvent(new Event('click'));
    expect(auth.resetPassword).toBeCalled();
    expect(auth.resetPassword).toHaveBeenCalledWith('teste@teste.com');
  });
});
describe('getTheRoad', () => {
  it('Deverá redirecionar ao Feed.', () => {
    getTheRoad.mockResolvedValueOnce(true);
    const pageLogin = Login();
    pageLogin.querySelector('#btn-sign-in').dispatchEvent(new Event('click'));
    expect(auth.getTheRoad).toBeCalled();
  });
});

describe('registerAccount', () => {
  it('Deverá criar uma conta.', () => {
    registerAccount.mockResolvedValueOnce(true);
    const pageRegister = Register();
    pageRegister.querySelector('#input-email').value = 'teste@teste.com';
    pageRegister.querySelector('#input-password').value = '12345678';
    pageRegister.querySelector('#input-name').value = 'Teste';
    const checkboxKeepLoggedIn = pageRegister.querySelector('#checkbox-keep-logged-in');
    pageRegister.querySelector('#btn-register-account').dispatchEvent(new Event('click'));
    expect(auth.registerAccount).toBeCalled();
    expect(auth.registerAccount).toHaveBeenCalledWith('teste@teste.com', '12345678', 'Teste', checkboxKeepLoggedIn);
  });
});
