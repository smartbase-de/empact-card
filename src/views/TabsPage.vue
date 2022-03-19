<template>
  <ion-page>
    <ion-tabs >
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom"  :class="CommonUtil.getCssClass(cardDetail).tabsBackGround">
        <ion-tab-button tab="tab2" href="/tabs/contacts" >
          <ion-icon :icon="peopleOutline" />
          <ion-label>CONTACTS </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="scan" href="/tabs/scaner">
          <ion-icon :icon="camera" />
          <ion-label>SCAN</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cards" :href="PAGE_PATHS.CARD_DETAIL.path+firstCardId" v-if="firstCardId!=''">
          <ion-icon :icon="idCardOutline" />
          <ion-label>CARD</ion-label>
        </ion-tab-button>

         <ion-tab-button tab="cards" v-else :href="PAGE_PATHS.ADD_PAGE.path">
          <ion-icon :icon="idCardOutline" />
          <ion-label>CARD</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="help" href="/tabs/help" >
          <ion-icon :icon="helpOutline" />
          <ion-label>HELP</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
      <ion-loading :is-open="loading" message="Please wait..."> </ion-loading>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardService from "../service/CardService";
import { auth,cardSharedService } from "@/main";
import {PAGE_PATHS, EVENT_NAME} from '../common/constant';
import eventBus from '../main';

import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonLoading,
} from "@ionic/vue";
import {
  idCardOutline,
  peopleOutline,
  helpOutline,
  camera,
} from "ionicons/icons";
import CommonUtil from "../common/CommonUtil";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonLoading
  },
  setup() {
    return {
      idCardOutline,
      peopleOutline,
      helpOutline,
      camera,
      PAGE_PATHS,
      CommonUtil,
      auth,
      cardSharedService
    };
  }, 

   data() {
    return {
      firstCardId: "",
      loading: false,
      cardDetail: {},
    };
  },
    methods: {
     
    getFirstCard: async function () {
      if (auth.currentUser && auth.currentUser.email) {
        this.loading = true;
        var temp = await CardService.getAll(auth.currentUser.email);
        // console.log(JSON.stringify(temp));
       var tempcards = [] as any;
        temp.forEach((doc) => {
          var obj = doc.data();
          obj.id = doc.id;
          tempcards.push(obj);
        });
        if(tempcards.length >0){
          this.firstCardId = tempcards[0].id;
           this.cardDetail = tempcards[0];
          cardSharedService.setCardDetail(tempcards[0]);
        }
        this.loading = false;
      }
    },
    
  },
   mounted() {
    this.getFirstCard();
      eventBus.on(EVENT_NAME.updatedCardDetail, () => {
   
      cardSharedService.getCardDetail().then((obj:any)=>{
        this.cardDetail = obj;
      });
    });
  },
  
  //  ionViewWillEnter() {
  //    cardSharedService.getCardDetail().then((obj:any)=>{
  //      this.cardDetail = obj;
  //    });
  //  }

});
</script>
<style>
.emapctGroupTabs, .emapctGroupTabs ion-tab-button{
background-color: #0099a6;
}
.superCareGroupTabs, .superCareGroupTabs ion-tab-button{
  background-color: #EC1E26 !important;
}

.empactGroupBg {
    --background: url('/public/assets/bg-empact.png') 100% 100%; /* if supercare bg-supercare.png*/
}
.superCareGroupBg {
    --background: url('/public/assets/bg-supercare.png') 100% 100%; /* if supercare bg-supercare.png*/
}
</style>
