/**
 * @jest-environment jsdom
 */

import {
  logOut,
  loginWithGoogle,
  loginWithEmailAndPassword,
  updateUserProfile,
  persisteAccount,
  registerAccount,
  createTemplatePost,
  editPost,
  likePost,
  removeLikePost,
}
  from '../src/lib/ledi.js';

import { Login } from '../src/pages/login/login.js';

describe('logOut', () => {
  it('should be a function', () => {
    expect(typeof logOut).toBe('function');
  });
  it('should call Firebase function', () => {
    logOut();
    expect(firebase.auth).toBeCalled();
  });
});

describe('LoginGoogle', () => {
  it('should be a function', () => {
    expect(typeof loginWithGoogle).toBe('function');
  });
  it('should call Firebase function', () => {
    loginWithGoogle();
    expect(firebase.auth).toBeCalled();
  });
});

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof loginWithEmailAndPassword).toBe('function');
  });
  it('should call firebase', () => {
    loginWithEmailAndPassword('email', 'password');
    expect(firebase.auth).toBeCalled();
  });
});

describe('updateUserProfile', () => {
  it('should be a function', () => {
    expect(typeof updateUserProfile).toBe('function');
  });
  it('should call Firebase function', () => {
    updateUserProfile('name, url');
    expect(firebase.auth).toBeCalled();
  });
});

describe('Keep', () => {
  it('should be a function', () => {
    expect(typeof persisteAccount).toBe('function');
  });
  it('should call Firebase function', () => {
    persisteAccount('');
    expect(firebase.auth).toBeCalled();
  });
});

describe('creatTemplatePost', () => {
  it('should be a function', () => {
    expect(typeof createTemplatePost).toBe('function');
  });
  it('should call firebase', () => {
    createTemplatePost();
    expect(firebase.auth).toBeCalled();
  });
});

describe('registerAccount', () => {
  it('should be a function', () => {
    expect(typeof registerAccount).toBe('function');
  });
  it('should call firebase', () => {
    registerAccount();
    expect(firebase.auth).toBeCalled();
  });
});

describe('editPost', () => {
  it('should be a function', () => {
    expect(typeof editPost).toBe('function');
  });
  it('should call firebase', () => {
    expect(firebase.auth).toBeCalled();
  });
});

describe('likePost', () => {
  it('should be a function', () => {
    expect(typeof likePost).toBe('function');
  });
  it('should call firebase', () => {
    expect(firebase.auth).toBeCalled();
  });
});

describe('removeLikePost and like post', () => {
  it('should be a function', () => {
    expect(typeof removeLikePost).toBe('function');
  });
  it('should call firebase and dislike post', () => {
    expect(firebase.auth).toBeCalled();
  });
});

describe('loginPage', () => {
  it('should render login page', () => {
    const loginPage = Login();
    console.log(loginPage);
    loginPage.querySelector('#input-email').value = 'teste@teste.com';
    loginPage.querySelector('#input-password').value = '12345678';
    loginPage.querySelector('#btn-login').click();
    expect(loginWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(loginWithEmailAndPassword).toHaveBeenCalledWith('teste@teste.com', '12345678');
  });
});
