import { Injectable, Inject } from '@angular/core';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';

@Injectable()
export class AuthService {
  authState!: any;
  auth: any;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.listenToAuthstate();
  }
  public async setPersistence(): Promise<void> {
    // this.auth.setPersistence(firebase.default.auth.Auth.Persistence);
    this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.SESSION);
  }

  listenToAuthstate() {
    return this.afAuth.authState.subscribe((authState) => {
      console.log('authState Listener:', authState);
      this.authState = authState;
    });
  }

  async login() {
    const login: any = await this.emailLogin({ email: 'contactomarnow@gmail.com', password: 'password123456' });
  }

  async logout() {
    const logoutRes = await this.afAuth
      .signOut()
      .catch((err) => console.error('logout:', err));
  }

  doRegister(value: {email: string; password: string}) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then((res) => { resolve(res); }, (err) => reject(err) );
    });
  }

  emailLogin(value: {email: string; password: string}) {
    return this.afAuth
      .signInWithEmailAndPassword(value.email, value.password)
      .then((user) => console.log('emailLogin:', value.email))
      .catch((error) => console.error('emailLogin:', value.email));
  }
}
