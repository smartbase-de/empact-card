//export const APP_URL= "http://localhost:8100/"
export const APP_URL= "https://smartbase-contacts.web.app/"

export const PAGE_PATHS = {
    ADD_PAGE: {
        path: "/tabs/addcard"
    },
    CARD_DETAIL: {
        path: "/tabs/carddetail/"
    },
    SHARE_CARD: {
        path: "/tabs/sharecard/"
    },
    CONTACT_DETAIL :{
      path: "/tabs/contact/"
    },
    EDIT_CARD :{
      path: "/tabs/editcard/"
    }
}

export const COMPANY_NAME = {
  EMPACT_GROUP: {
    label: "Empact Group",
    value: "empact_group",
    emailPostFix: "empactgroup.co.za",
    webAddress: "empactgroup.co.za"
  },
  SUPER_CARE: {
    label: "Super Care",
    value: "super_care",
    emailPostFix: "supercare.co.za",
    webAddress: "supercare.co.za"
  },
  OTHER: {
    label: "Other",
    value: "other",
    emailPostFix: "",
    webAddress: ""
  }

}

export const EVENT_NAME = {
  updatedCardDetail: 'updatedCardDetail'
};