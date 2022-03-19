<template>
  <ion-page>
    <ion-header>
      <ion-toolbar
        :color="CommonUtil.getCssClass(values).headerBackground"
      >
        <ion-buttons slot="start">
          <!--<ion-back-button color="secondary"></ion-back-button>-->
        </ion-buttons>
        <ion-title class="ion-text-center">EDIT CARD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      :class="CommonUtil.getCssClass(values).contentBackgroundClass"
    >
      <!-- <ion-header collapse="condense">
        <ion-toolbar color="secondary">
          <ion-title size="large">ADD MY CARD</ion-title>
        </ion-toolbar>
      </ion-header> -->

      <!-- <ExploreContainer name="Tab 1 page" /> -->
      <div class="form">
        <ion-item>
          <ion-label color="secondary">Name</ion-label>

          <ion-input type="text" v-model="values.name" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Company</ion-label>
          <!-- <ion-input type="text" v-model="values.company" /> -->

        <ion-select placeholder="Select One" v-model="values.company" >
           <ion-select-option :key="comp.value" v-for="comp in getCompanyList" :value="comp.value">{{comp.label}}</ion-select-option>
        </ion-select>
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Title</ion-label>
          <ion-input type="text" v-model="values.title" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Work Phone</ion-label>
          <ion-input type="text" v-model="values.workPhone" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Mobile</ion-label>
          <ion-input type="text" v-model="values.mobile" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Whatsapp </ion-label>
          <ion-checkbox v-model="values.whatsapp"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Email</ion-label>
          <ion-input type="text" v-model="values.email" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Address Line 1</ion-label>
          <ion-input type="text" v-model="values.addressline1" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Address Line 2</ion-label>
          <ion-input type="text" v-model="values.addressline2" />
        </ion-item>
        <ion-item>
          <ion-label color="secondary">Selfie</ion-label>
          <ion-button @click="takePicture()">
            <ion-icon slot="icon-only" :icon="cameraOutline" color="light"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-thumbnail>
            <img :src="values.imagePath" v-if="values.imagePath" />
          </ion-thumbnail>
        </ion-item>
      </div>

      <ion-fab vertical="top" horizontal="end" edge slot="fixed">
        <ion-fab-button @click="saveAndUpdateCard()" color="secondary">
          <ion-icon :icon="saveOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <ion-loading :is-open="loading" message="Please wait..."> </ion-loading>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  IonItem,
  IonButtons,
  //IonBackButton,
  IonLabel,
  IonInput,
  IonIcon,
  IonFab,
  IonFabButton,
  IonCheckbox,
  IonThumbnail,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { saveOutline, cameraOutline } from "ionicons/icons";
import CardService from "../service/CardService";
import { auth, cardSharedService } from "../main";
import { PAGE_PATHS, COMPANY_NAME, EVENT_NAME } from "../common/constant";
import CommonUtil from "../common/CommonUtil";
import { Camera, CameraResultType } from "@capacitor/camera";
import eventBus from '../main';
// import FileUploadService from "../service/FileUploadService";

// import {USER_CARD_DATA} from '../common/constant';

export default defineComponent({
  name: "AddCardPage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLoading,
    IonItem,
    IonButtons,
    //IonBackButton,
    IonLabel,
    IonInput,
    IonIcon,
    IonFab,
    IonFabButton,
    IonCheckbox,
    IonThumbnail,
    IonButton,
    IonSelect,
    IonSelectOption
  },
  setup() {
    return {
      saveOutline,
      cameraOutline,
      CommonUtil,
      auth,
    };
  },

  computed: {
    getCompanyList(){
      let arr =[];
      arr.push(COMPANY_NAME.EMPACT_GROUP);
      arr.push(COMPANY_NAME.SUPER_CARE);
      arr.push(COMPANY_NAME.OTHER);
      return arr;
    }
   
  },
  data() {
    return {
      loading: false,
      values: {
        name: "",
        //  company: "Empact Group",
        // company: CommonUtil.GetCompanyNameFromEmail(
        //   auth.currentUser?.email || ""
        // ),
        company: COMPANY_NAME.EMPACT_GROUP.value,
        title: "",
        workPhone: "+27",
        mobile: "+27",
        email: "",
        addressline1: "",
        addressline2: "",
        userEmail: "",
        userUuid: "",
        whatsapp: false,
        imagePath: "",
      },
    };
  },
  methods: {
    // getAddressFirstList(val:any){
    //     var t = val.substring(0,val.indexOf(","));
    //     return t.trim();
    //   },
    //    getAddressSecondList(val:any){
    //     var t = val.substring(val.indexOf(",")+1, val.length)
    //     return t.trim();
    //   },
    //   addCardsForMasterUsers: async function(){
    //       USER_CARD_DATA.forEach(async (doc) => {
    //         var obj ={
    //            name: doc.NAME,
    //           company: "Empact Group",
    //           title: doc.POSITION,
    //           workPhone: doc.work_phone,
    //           mobile: doc.mobile,
    //           email: doc.Email_Address.toLowerCase(),
    //           addressline1: this.getAddressFirstList(doc.Work_Address),
    //           addressline2:this.getAddressSecondList(doc.Work_Address),
    //           userEmail: doc.Email_Address.toLowerCase(),
    //           userUuid:doc.uuid,
    //         }

    //         try{
    //         await CardService.create(obj);
    //         }catch(e){
    //            console.log("**********************");
    //            console.log(JSON.stringify(e));
    //                 console.log(JSON.stringify(obj));
    //         }

    //       });
    //   },

    takePicture: async function () {
      const image = await Camera.getPhoto({
        quality: 100,
        width: 640,
        height: 480,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });

      // const user = auth.currentUser;
      // const filePath = `${user?.uid}/images/image_+${+ new Date()}.${image.format}`;
      if (image?.dataUrl) {
        this.values.imagePath = image.dataUrl;
      }
      // Can be set to the src of an image now
    },
    testAB(){
      console.log("this is an empty method created for to pass in event as callback");
    },
    saveAndUpdateCard: async function () {
      if (auth.currentUser && auth.currentUser.email) {
        this.values.userEmail = auth.currentUser.email;
      }
      if (auth.currentUser && auth.currentUser.uid) {
        this.values.userUuid = auth.currentUser.uid;
      }
      let tempid;
      this.loading = true;
    
      if (this.$route.params.id) {
         if(!this.values.whatsapp){
           this.values.whatsapp = false;
         }
         if(!this.values.imagePath){
           this.values.imagePath = "";
         }
        await CardService.update(this.values, this.$route.params.id);
        tempid = this.$route.params.id || "";
      } else {
        tempid = await CardService.create(this.values);
         
      }
      cardSharedService.setCardDetail(JSON.parse(JSON.stringify(this.values)));
        eventBus.dispatch(EVENT_NAME.updatedCardDetail,this.testAB);
      this.loading = false;
      this.$router.push(PAGE_PATHS.CARD_DETAIL.path + tempid);
    },

    getCardDetail: async function () {
      const id = this.$route.params.id;
      if (id) {
        this.loading = true;
        let obj = await CardService.getById(id);
        // console.log(JSON.stringify(obj));
        if (obj && obj.id) {
          this.values.name = obj.name;
          this.values.company = obj.company;
          this.values.title = obj.title;
          this.values.workPhone = obj.workPhone;
          this.values.mobile = obj.mobile;
          this.values.email = obj.email;
          this.values.addressline1 = obj.addressline1;
          this.values.addressline2 = obj.addressline2;
          this.values.userEmail = obj.userEmail;
          this.values.userUuid = obj.userUuid;
          this.values.whatsapp = obj.whatsapp;
          this.values.imagePath = obj.imagePath;
        }
        this.loading = false;
      }
    },
  },

  // mounted() {
  //   this.getCardDetail();
  // },
  ionViewWillEnter() {
    this.getCardDetail();
  },
});
</script>
<style scoped>
.form {
  margin-top: 40px;
}
/* ion-content {
    --background: url('/public/assets/bg-empact.png') no-repeat 100% 100%;
} */
</style>
