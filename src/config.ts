export type BCLConfigKey = 
  | 'siteUrl' 
  | 'email' 
  | 'phone' 
  | 'coachli' 
  | 'consultationForm' 
  | 'selarStore' 
  | 'linkedin' 
  | 'instagram' 
  | 'mailerliteActionUrl' 
  | 'contactFormActionUrl';

export interface BCLConfig {
  siteUrl: string;
  email: string;
  phone: string;
  coachli: string;
  consultationForm: string;
  selarStore: string;
  linkedin: string;
  instagram: string;
  offers: {
    operationalClarityAudit: string;
    focusedSystemBuild: string;
    operationalResetPackage: string;
  };
  mailerliteActionUrl: string;
  contactFormActionUrl: string;
}

export const fallbackConfig: BCLConfig = {
  siteUrl: "https://www.bethconsultingltd.com",
  email: "bethconsultingltd@gmail.com",
  phone: "08078312797",
  coachli: "https://coachli.co/bethconsultingltd/SV-g1xbd",
  consultationForm: "https://forms.gle/PFdeFEP4hmgYHjTf9",
  selarStore: "https://selar.com/m/bethconsulting",
  linkedin: "https://www.linkedin.com/company/beth-consulting-limited/",
  instagram: "https://www.instagram.com/bethconsulting",
  offers: {
    operationalClarityAudit: "https://selar.com/a56ktw2y24",
    focusedSystemBuild: "https://selar.com/5gza75l546",
    operationalResetPackage: "https://selar.com/38q1ol1a24"
  },
  mailerliteActionUrl: "",
  contactFormActionUrl: ""
};
