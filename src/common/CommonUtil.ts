import {COMPANY_NAME} from './constant';
export default class CommonUtil {
    static GetLogoImagePath(obj:any) { 
        const imgObj ={
            path: "",
            alt: ""
        }
       
        if(COMPANY_NAME.SUPER_CARE.value == obj.company){
            imgObj.path = "/assets/icon/logo-supercare.png";
            imgObj.alt = "SuperCar Logo"
        }
        if(COMPANY_NAME.EMPACT_GROUP.value == obj.company){
            imgObj.path = "/assets/icon/logo-empact.png";
            imgObj.alt = "Empact Logo"
        }
        return imgObj;
    }
    static GetCompanyNameFromEmail(email:string) { 
        
        if(!email || email == "" || email.indexOf("@")<0){
            return "";
        }
        const email_domain = email.split("@")[1];
        if(COMPANY_NAME.EMPACT_GROUP.emailPostFix ==email_domain.toLowerCase() ){
            return COMPANY_NAME.EMPACT_GROUP.label;
        }
        if(COMPANY_NAME.SUPER_CARE.emailPostFix ==email_domain.toLowerCase() ){
            return COMPANY_NAME.SUPER_CARE.label;
        }
        return "";
    
    }
    static GetCompanyDomainName(obj:any) { 
        
        if(!obj.company || obj.company == ""){
            return "";
        }
      
        if(COMPANY_NAME.EMPACT_GROUP.value ==obj.company.toLowerCase() ){
            return COMPANY_NAME.EMPACT_GROUP.webAddress;
        }
        if(COMPANY_NAME.SUPER_CARE.value ==obj.company.toLowerCase() ){
            return COMPANY_NAME.SUPER_CARE.webAddress;
        }
        return  "";
    
    }
    static getCssClass(obj:any) { 
        const classObj ={
            contentBackgroundClass: "empactGroupBg",
            headerBackground: "primary",
            tabsBackGround: "emapctGroupTabs",
        }
        // const companyName = this.GetCompanyNameFromEmail(obj.email);
        if(!obj.company || obj.company == ""){
            return classObj;
        }
        if(COMPANY_NAME.SUPER_CARE.value == obj.company){
            classObj.contentBackgroundClass = "superCareGroupBg";
            classObj.headerBackground = "tertiary";
            classObj.tabsBackGround= "superCareGroupTabs";
          
        }
        return classObj;
    }

    static getCardClass(obj:any) { 
        const classObj ={
            cardClassForColor: "emapct-group-card",
        }
      
        if(COMPANY_NAME.SUPER_CARE.value == obj.company){
            classObj.cardClassForColor = "supercare-group-card";
          
        }
        return classObj;
    }
}