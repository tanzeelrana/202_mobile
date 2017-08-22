import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the TenantCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tenant-create',
  templateUrl: 'tenant-create.html',
})
export class TenantCreatePage {

  @ViewChild('fileInput') fileInput;
  @ViewChild('companyLogoFileInput') companyLogoFileInput;
  
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public camera: Camera
  ) {
    this.form = formBuilder.group({
      profilePic: [''],
      companyLogoPic: [''],

      firstName: ['Amir', Validators.required],
      lastName: ['Bilgrami', Validators.required],
      email: ['tanzeelrana@cmail.carleton.ca', Validators.email],
      password: ['tanzeel', Validators.required],
      about: ['about'],
      companyName: ['Bilgrami Trading Inc.', Validators.required],      
      companyStatus: [false, Validators.required],
      username: ['amirbilgrami', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    
  }

  getPicture(source) {
    let me = this;
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        let ImgObj = {};
        ImgObj[source] = 'data:image/jpg;base64,' + data;
        me.form.patchValue(ImgObj);
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
      let ImgObj = {};
      ImgObj[source] = imageData;
      me.form.patchValue(ImgObj);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle(source) {
    return 'url(' + this.form.controls[source].value + ')'
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
