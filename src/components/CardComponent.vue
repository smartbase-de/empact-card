<template>
  <div class="custom-card">
    <div
      :class="
        'custom-card-content ' + CommonUtil.getCardClass(card).cardClassForColor
      "
    >
      <span class="photo a"> </span>
      <span class="logo a">
        <!-- <img src="/assets/icon/logo-empact.png" alt="Empact Logo" /> -->
        <img
          v-if="CommonUtil.GetLogoImagePath(card).path"
          :src="CommonUtil.GetLogoImagePath(card).path"
          :alt="CommonUtil.GetLogoImagePath(card).alt"
        />
      </span>
      <br />
      <div class="custom-name">{{ card.name }}</div>
      <!--<h3 class="custom-company">{{card.company}}</h3>-->
      <h3 class="custom-title selectext">{{ card.title }}</h3>
      <div class="custom-card-sec-detail selectext">
        <span class="t"> M </span>
        <span
          class="custom-phone selectext"
          @click="copyToClipBoard(card.mobile, 'Mobile number')"
          >{{ card.mobile }}
        </span>
        <span class="t"> T </span
        ><span
          class="custom-phone selectext"
          @click="copyToClipBoard(card.workPhone, 'Work Phone')"
          >{{ card.workPhone }}</span
        ><br />
        <span class="custom-whatsapp selectext">
          <ion-icon :icon="logoWhatsapp" color="success"></ion-icon> Whatsapp
          Allowed :
          <span v-if="card.whatsapp">Yes</span>
          <span v-else>No</span>
        </span>
        <br />
        <span class="e">E </span
        ><span
          class="custom-email selectext"
          @click="copyToClipBoard(card.email, 'Email')"
          >{{ card.email }}</span
        ><br />
        <span class="custom-address selectext"> {{ card.addressline1 }} </span
        ><br />
        <span class="custom-address selectext"> {{ card.addressline2 }} </span
        ><br />
        <span class="custom-web selectext">
          {{ CommonUtil.GetCompanyDomainName(card) }}
        </span>
      </div>
      <div class="thebe" v-if="CommonUtil.GetLogoImagePath(card).path">
        <img src="/assets/icon/thebe.png" alt="Thebe Logo" />
      </div>
    </div>
    <span class="">
      <!-- <img src="/assets/selfie.jpg" alt="Selfie" /> -->
      <ion-img :src="card.imagePath" v-if="card.imagePath"></ion-img>
      <ion-icon
        :icon="personOutline"
        class="iconSize"
        color="light"
        v-if="!card.imagePath"
      ></ion-icon>
    </span>
  </div>
  <ion-toast
    position="top"
    :is-open="showToast"
    :message="toastMessage"
    :duration="2000"
    @didDismiss="hideToast(false)"
  >
  </ion-toast>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonToast, IonIcon, IonImg } from "@ionic/vue";
import { Clipboard } from "@capacitor/clipboard";
import { logoWhatsapp, personOutline } from "ionicons/icons";
import CommonUtil from "../common/CommonUtil";
import { auth } from "../main";

export default defineComponent({
  name: "CardComponent",
  components: {
    IonToast,
    IonIcon,
    IonImg,
  },
  props: {
    card: { type: Object },
  },
  data() {
    return {
      showToast: false,
      toastMessage: "",
    };
  },
  setup() {
    return {
      logoWhatsapp,
      personOutline,
      CommonUtil,
      auth,
    };
  },
  methods: {
    copyToClipBoard: async function (val: any, name: string) {
      val = val.toString();
      await Clipboard.write({
        string: val,
      });
      this.toastMessage = name + " has been copied";
      this.showToast = true;
    },
    hideToast(val: boolean) {
      this.showToast = val;
    },
  },
});
</script>

<style>
.custom-card {
  margin: 0px;
  border: 1px solid #efefef;
  position: relative;
  background-color: #fff;
}
.custom-card-left {
  background-color: #fff;
  width: 1%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}
.custom-card-content {
  margin-left: 3%;
  margin-top: 15px;
  padding-bottom: 30px;
}
.custom-card-content h3 {
  padding: 0;
  margin: 0;
}
.custom-card-content .custom-name {
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 1.5em;
  text-transform: uppercase;
  font-family: "Rubrik";
  clear: both;
}
.custom-card-content .custom-web {
  color: var(--ion-color-primary);
  font-size: 0.8em;
}
.custom-card-content .m {
  color: var(--ion-color-primary);
  font-size: 1.1em;
}
.custom-card-content .t {
  color: var(--ion-color-primary);
  font-size: 1.1em;
}
.custom-card-content .e {
  color: var(--ion-color-primary);
  font-size: 1.1em;
}
.custom-card-content .custom-company {
  color: #000;
  margin-top: 5px;
  text-transform: uppercase;
}
.custom-card-content .custom-title {
  color: var(--ion-color-dark);
  margin-top: 5px;
  font-size: 1.5em;
  font-family: "Rubrik";
}
.custom-card-sec-detail {
  margin-top: 15px;
  line-height: 1.5em;
}
.custom-card-sec-detail .custom-phone {
  color: var(--ion-color-dark);
}
.custom-card-sec-detail .custom-whatsapp {
  color: var(--ion-color-dark);
  font-size: 0.8em;
}
.custom-card-sec-detail .custom-email {
  color: var(--ion-color-dark);
  font-size: 0.8em;
}
.custom-card-sec-detail .custom-address {
  color: var(--ion-color-dark);
  font-size: 0.8em;
}
.logo {
  padding-top: 30px !important;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-left: 0px;
  min-height: 65px;
  text-align: right;
}
.logo img {
  max-width: 180px;
  clear: right;
}
.photo {
  padding-top: 20px !important;
  padding-right: 5px;
  padding-bottom: 0px;
  padding-left: 0px;
  min-height: 65px;
  width: 150px;
  text-align: left;
  overflow: hidden;
}
.photo img {
  max-width: 150px;
  max-height: 160px;
}
span.a {
  float: left; /* the default for span */
  width: 150px;
  height: 150px;
  padding: 5px;
}
.thebe {
  padding-top: 0px;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-left: 0px;
  min-height: 67px;
  text-align: right;
}
.thebe img {
  max-width: 171px;
}

.title {
  font-family: "Rubrik";
}
.sendIcon {
  margin-right: 10px;
}
.custom-send-button {
  position: absolute;
  right: 20px;
  bottom: 80px;
}
/* ion-content {
    --background: url('/public/assets/bg-empact.png') 100% 100%; 
} */

/* .empactGroupBg {
    --background: url('/public/assets/bg-empact.png') 100% 100%; 
}
.superCareGroupBg {
    --background: url('/public/assets/bg-supercare.png') 100% 100%;
} */
.supercare-group-card .custom-name,
.supercare-group-card .m,
.supercare-group-card .t,
.supercare-group-card .e,
.supercare-group-card .custom-web {
  color: var(--ion-color-tertiary);
}
.selectext {
  -webkit-user-select: auto;
}
.iconSize {
  font-size: 120px;
}
</style>
