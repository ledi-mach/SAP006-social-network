global.firebase = {
  auth: jest.fn(() => ({
    loginWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    logOut: jest.fn(),
    signOut: jest.fn(),
    loginWithGoogle: jest.fn(),
    updateUserProfile: jest.fn(),
    signInWithPopup: jest.fn(),
    updateProfile: jest.fn(),
    persisteAccount: jest.fn(),
    setPersistence: jest.fn(),
    currentUser: jest.fn(() => ({
      updateUserProfile: jest.fn(),
    })),
    firestore: jest.fn(() => ({

    })),
  })),
};
