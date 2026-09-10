import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
export class AuthService {
  private auth: Auth;
  constructor() {
    const firebaseConfig = {
      apiKey: "YOUR_FIREBASE_API_KEY",
      authDomain: "YOUR_FIREBASE_PROJECT.firebaseapp.com",
      projectId: "YOUR_FIREBASE_PROJECT",
      storageBucket: "YOUR_FIREBASE_PROJECT.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }
  public signUp(email: string, pass: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, pass).then((cred) => cred.user);
  }
  public signIn(email: string, pass: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, pass).then((cred) => cred.user);
  }
  public logout(): Promise<void> {
    return signOut(this.auth);
  }
  public subscribeAuthState(listener: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, listener);
  }
}
