<template>
  <ion-page>
    <ion-header>
      <ion-toolbar
        :color="CommonUtil.getCssClass(cardDetail).headerBackground"
      >
        <ion-title class="ion-text-center title">CONTACTS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      :class="CommonUtil.getCssClass(cardDetail).contentBackgroundClass"
    >
      <!-- <ion-header collapse="condense">
        <ion-toolbar color="primary">
          <ion-title class="ion-text-center title">CONTACTS</ion-title>
        </ion-toolbar>
      </ion-header> -->
      <ion-searchbar v-model="search"></ion-searchbar>
      <!-- List of Text Items -->
      <ion-list>
        <ion-item
          v-for="contact in filteredList"
          :key="contact.id"
          @click="openContactDetail(contact)"
        >
          <ion-avatar slot="start">
            <ion-icon
              :icon="personOutline"
              class="iconSize"
              color="dark"
            ></ion-icon>
          </ion-avatar>
          <ion-label>
            <h2>{{ contact.name }}</h2>
            <h3>{{ contact.title }}</h3>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-loading :is-open="loading" message="Please wait..."> </ion-loading>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonLoading,
  IonSearchbar,
  IonAvatar,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import ContactService from "../service/ContactService";
import { auth, cardSharedService } from "@/main";
import { PAGE_PATHS } from "../common/constant";
import CommonUtil from "../common/CommonUtil";
import { personOutline } from "ionicons/icons";

const searchbar = document.querySelector("ion-searchbar");

export default defineComponent({
  name: "Contacts",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonLoading,
    IonSearchbar,
    IonAvatar,
    IonIcon,
  },
  setup() {
    return {
      CommonUtil,
      personOutline,
      auth,
    };
  },
  data() {
    return {
      contacts: [],
      loading: false,
      search: "",
      cardDetail:{},
    };
  },
  computed: {
    filteredList() {
      let tempContacts = this.contacts;
      if (this.search != "" && this.search) {
        tempContacts = tempContacts.filter((contact) => {
          return contact.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }

      tempContacts = tempContacts.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      return tempContacts;
    },
  },
  methods: {
    openContactDetail(obj) {
      this.$router.push(PAGE_PATHS.CONTACT_DETAIL.path + obj.id);
    },
    getContacts: async function () {
      this.contacts = [];
      if (auth.currentUser && auth.currentUser.email) {
        this.loading = true;
        var temp = await ContactService.getAll(auth.currentUser.email);
        // console.log(JSON.stringify(temp));
        temp.forEach((doc) => {
          var obj = doc.data();
          obj.id = doc.id;
          this.contacts.push(obj);
        });
        // console.log(JSON.stringify(this.contacts));
        this.loading = false;
      }
    },
  },
  // mounted() {
  //   // this.getContacts();
  //    console.log("contacts : " +JSON.stringify(cardSharedService.getCardDetail()));
  // },
  ionViewWillEnter() {
    this.getContacts();
      cardSharedService.getCardDetail().then((obj)=>{
       this.cardDetail = obj;
     });
  },
});
</script>
<style scoped>
/* ion-content {
  --background: url('/public/assets/bg-empact.png') 100% 100%; 
} */
.iconSize {
  font-size: 32px;
}
</style>
