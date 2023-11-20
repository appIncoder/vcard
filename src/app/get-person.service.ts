import { Injectable } from '@angular/core';
//import { Person } from './model.person';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Subject } from 'rxjs';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";

const OAuthConfig: AuthConfig= {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '726647460113-f2t5fa48m02ei2hlpogjv4ljdguu60nq.apps.googleusercontent.com',
  scope: 'openid profile email ' +
         'https://www.googleapis.com/auth/contacts ' +
         'https://www.googleapis.com/auth/contacts.readonly ' +
         'https://www.googleapis.com/auth/directory.readonly ' +
         'https://www.googleapis.com/auth/user.addresses.read ' +
         'https://www.googleapis.com/auth/user.birthday.read ' +
         'https://www.googleapis.com/auth/user.emails.read ' +
         'https://www.googleapis.com/auth/user.gender.read ' +
         'https://www.googleapis.com/auth/user.organization.read ' +
         'https://www.googleapis.com/auth/user.phonenumbers.read ' +
         'https://www.googleapis.com/auth/userinfo.email ' +
         'https://www.googleapis.com/auth/userinfo.profile ' +
         'https://www.googleapis.com/auth/admin.directory.user ' +
         'https://www.googleapis.com/auth/admin.directory.user.readonly '
}

export interface UserInfo {
  info: {
    sub: any,
    email: any,
    family_name: any,
    given_name: any,
    name: any,
    picture: any,
    hd: any,
    phone: any,
    birthday: any
  }
}

export interface Metadata{
  "primary": boolean,
  "sourcePrimary": boolean,
  "verified": boolean,
  "source": any
}

export interface phoneNumberInfo {
  info: {
      metadata: Metadata,
      value: string,
      canonicalForm: string,
      type: string,
      formattedType: string
  }
}


@Injectable({
  providedIn: 'root'
})
export class GetPersonService {

  userProfileSubject= new Subject<UserInfo>();
  myAccessToken!: string;
  userInfoImg!: string;
  userEmail!: string;


  constructor(private http: HttpClient, private oAuthService: OAuthService) {
    oAuthService.configure(OAuthConfig);
    oAuthService.logoutUrl= 'https://www.google.com/accounts/Logout';
    oAuthService.loadDiscoveryDocument()
    .then( () => {
      oAuthService.tryLoginImplicitFlow()
      .then( () => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          this.myAccessToken= oAuthService.getAccessToken();
          oAuthService.loadUserProfile()
          .then( (userProfile) => {
            this.userInfoImg= (userProfile as UserInfo).info.picture;
            this.userEmail= (userProfile as UserInfo).info.email;
            this.userProfileSubject.next(userProfile as any)
          })
        }
      })
      .catch( () => {
        // Getting local data
        console.log('Offline mode: ');
        }
      )
    })
  }

  getMyInfos(myEmail: string): Observable<any> {
      this.myAccessToken= this.oAuthService.getAccessToken();

      const newstr = myEmail.replace("@", "%40");

      const headers= new HttpHeaders()
        .set('Accept', `application/json`)
        .set('Authorization', `Bearer ${this.myAccessToken}`);

//      const url = 'https://admin.googleapis.com/admin/directory/v1/users/etienne.darquennes%40arexo.be?customFieldMask=phoneNumber&viewType=domain_public';
      const url = `https://admin.googleapis.com/admin/directory/v1/users/${newstr}?customFieldMask=phoneNumber&viewType=domain_public`;

      const myReturn= this.http.get<any>(url,{ 'headers': headers });
      return myReturn;
  }

  getUserImg(): string {
    return this.userInfoImg;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  logOut() {
    this.oAuthService.logOut();
  }

}
