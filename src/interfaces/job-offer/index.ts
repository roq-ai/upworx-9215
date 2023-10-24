import { ContractInterface } from 'interfaces/contract';
import { JobApplicationInterface } from 'interfaces/job-application';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface JobOfferInterface {
  id?: string;
  salary_range?: string;
  job_description?: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  contract?: ContractInterface[];
  job_application?: JobApplicationInterface[];
  company?: CompanyInterface;
  _count?: {
    contract?: number;
    job_application?: number;
  };
}

export interface JobOfferGetQueryInterface extends GetQueryInterface {
  id?: string;
  salary_range?: string;
  job_description?: string;
  company_id?: string;
}
