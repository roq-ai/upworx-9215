import { JobOfferInterface } from 'interfaces/job-offer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContractInterface {
  id?: string;
  contract_status?: string;
  contract_duration?: number;
  job_offer_id: string;
  freelancer_id: string;
  created_at?: any;
  updated_at?: any;

  job_offer?: JobOfferInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ContractGetQueryInterface extends GetQueryInterface {
  id?: string;
  contract_status?: string;
  job_offer_id?: string;
  freelancer_id?: string;
}
