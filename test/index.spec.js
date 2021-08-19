import {
  logOut,
  loginWithGoogle,
  loginWithEmailAndPassword,
  updateUserProfile,
  persisteAccount,
} from '../src/lib/ledi';

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
    loginWithGoogle('user');
    expect(firebase.auth).toBeCalled();
  });
});

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof loginWithEmailAndPassword).toBe('function');
  });
  it('should call Firebase function', () => {
    loginWithEmailAndPassword('email, pass');
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
