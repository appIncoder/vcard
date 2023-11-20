import { Component, OnInit } from '@angular/core';
import { GetPersonService, UserInfo } from './get-person.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'arexoCards';

  myVcardQrCode: string='';
  myEmail!: string;
  fullName!: string;
  familyName!: string;
  givenName!: string;
  myTitle!: string;
  phone!: string;
  webSite!: string;

  myImgUrl!: string;

  userInfo?: UserInfo;
  userEmail?: string;


  constructor(private getPersonService: GetPersonService) {
  /*      this.getPersonService.userProfileSubject
      .subscribe(info => {
                          this.userInfo= info;
                          this.userEmail= this.userInfo.info.email;
                          this.webSite= this.userInfo.info.hd;

                          this.getPersonService.getMyInfos(this.userEmail!)
                          .subscribe(data => {
                                              console.log('data: ', data);

                                              this.myEmail= data.emails[0].address;
                                              this.fullName= data.name.fullName;
                                              this.familyName= data.name.familyName;
                                              this.givenName= data.name.givenName;
                                              this.myTitle= data.organizations[0].title;
                                              this.phone=data.phones[0].value;

                                              this.myImgUrl= this.getPersonService.getUserImg();


                                              this.myVcardQrCode= 'BEGIN:VCARD \n'
                                                                   +'VERSION:4.0 \n'
                                                                   +'N:' + this.familyName + ';' + this.givenName + '\n'
                                                                   +'FN:' + this.fullName + '\n'
                                                                   +'ORG:Arexo \n'
                                                                   +'TITLE:' + this.myTitle + '\n'
                                                                   +'ADR;TYPE=WORK:;;Rue Campagne du Moulin 53/51. Tour Shopping Center St Georges, 5e étage;Saint-Georges-sur-Meuse;;4470;Belgique \n'
                                                                   +'TEL;WORK;VOICE: \n'
                                                                   +'TEL;CELL:' + this.phone + '\n'
                                                                   +'TEL;FAX: \n'
                                                                   +'EMAIL;WORK;INTERNET:' + this.myEmail + '\n'
                                                                   +'URL:' + this.webSite + ' \n'
                                                                   +'END:VCARD '
                                              });

                          });*/
                                                                              this.myVcardQrCode= 'BEGIN:VCARD \n'
                                                                                                   +'VERSION:4.0 \n'
                                                                                                   +'N:DARQUENNES;Etienne\n'
                                                                                                   +'FN:DARQUENNES Etienne\n'
                                                                                                   +'ORG:Mielabelo \n'
                                                                                                   +'TITLE:Senior Advisor\n'
                                                                                                   +'ADR;TYPE=WORK:;;Boulevard Dolez 23;Mons;;7000;Belgique \n'
                                                                                                   +'TEL;WORK;VOICE: \n'
                                                                                                   +'TEL;CELL:+32496809993\n'
                                                                                                   +'TEL;FAX: \n'
                                                                                                   +'EMAIL;WORK;INTERNET:etienne.darquennes@mielabelo.com\n'
                                                                                                   +'URL:mielabelo.com \n'
                                                                                                   +'END:VCARD '
  }

   ngOnInit(): void {
   }

  logOut() {
    this.getPersonService.logOut();
  }

}
