import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Camera } from '@ionic-native/camera';
import { Api } from '../../providers/api';
import { Client } from '../../models/clitent';

/**
 * Generated class for the ClientPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  @ViewChild('companyLogoFileInput') companyLogoFileInput;

  isReadyToSave: boolean;
  form: FormGroup;
  client: any;
  isNew = false;
  isEdit = false;
  public type= "password";
  public showPass = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public camera: Camera,
    public api: Api
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.isNew = navParams.data.isNew; 
    this.isEdit = navParams.data.isEdit;
    let clientModel = new Client(navParams.data.client);
    this.client = clientModel.getClientFormObj();
    this.form = formBuilder.group(this.client);
    console.log(this.form);
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }

  showPassword(){
    this.showPass = !this.showPass;
    if (this.showPass){
        this.type = "text";
    }else{
        this.type = "password";
    }
  }

  getPicture(source) {
    let me = this;
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        let imageData = 'data:image/jpg;base64,' + data;
        me.form.value.logo.url = imageData;
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this[source].nativeElement.click();
    }
  }

  processWebImage(event,source) {
    let me = this;
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      console.log(source);
      let imageData = (readerEvent.target as any).result;
      me.form.value.logo.url = imageData;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle(source) {
    return 'url(' + this.form.value[source].url + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

}
