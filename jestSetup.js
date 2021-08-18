global.firebase = {
  auth: jest.fn(() => ({
    loginWithEmailAndPassword: jest.fn(),
    logOut: jest.fn(),
    signOut: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    loginWithGoogle: jest.fn(),
    signInWithPopup: jest.fn(),
    currentUser: {
      uid: 1,
    },
  })),
};
