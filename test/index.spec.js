import { logOut, loginWithGoogle, loginWithEmailAndPassword } from '../src/lib/ledi';

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
    loginWithEmailAndPassword('email, password');
    expect(firebase.auth).toBeCalled();
  });
});
