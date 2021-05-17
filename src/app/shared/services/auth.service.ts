import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../interfaces/app-user';
import { switchMap } from 'rxjs/operators';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { User } from  'firebase';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user:User;
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.user$ = afAuth.authState;

    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async loginM(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['admin/list']);
}
async register(email: string, password: string) {
  var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  this.sendEmailVerification();
}

async sendEmailVerification() {
  await this.afAuth.auth.currentUser.sendEmailVerification()
  this.router.navigate(['admin/verify-email']);
}

async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
}

async logoutM(){
  await this.afAuth.auth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['admin/login']);
}
get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}

  loginG() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => this.userService.get(user.uid).valueChanges())
    );
  }
}

//logs the user in and out !
