import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase'  ;
import { AngularFireAuthModule } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  number:string="";
  code:string="";
  verificationID:any;

  constructor(public nav:NavController) {}
  sendOTP(){
    (<any>window).FirebasePlugin.verifyPhoneNumber('+91 8690806403',60,(credential)=>{
      alert("sms sent successfully");
      console.log(credential);
      this.verificationID=credential.verificationID;
    },function(error){
      console.log(error)
    });
  }

  verify(){
    let signCredential=firebase.auth.PhoneAuthProvider.credential(this.verificationID,this.code);
    firebase.auth().signInWithCredential(signCredential).then((info)=>
    {
      console.log(info)
    },(error)=>{
      console.log(error) 
    })

  }
}
