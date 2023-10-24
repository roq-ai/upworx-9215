interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Freelancer'],
  tenantRoles: ['Owner', 'Recruiter'],
  tenantName: 'Company',
  applicationName: 'Upworx',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage job applications',
    'Manage contracts',
    'Apply to job offers',
    'Update personal information',
  ],
  ownerAbilities: ['Manage contracts', 'Manage job applications', 'Manage job offers', 'Manage company'],
  getQuoteUrl: 'https://app.roq.ai/proposal/efa9dd94-d0e3-4f66-b655-882684bdd4b6',
};
