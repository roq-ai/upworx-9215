import { UserInterface } from 'interfaces/user';
import { JobOfferInterface } from 'interfaces/job-offer';
import { GetQueryInterface } from 'interfaces';

export interface JobApplicationInterface {
  id?: string;
  application_status?: string;
  application_feedback?: string;
  freelancer_id: string;
  job_offer_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  job_offer?: JobOfferInterface;
  _count?: {};
}

export interface JobApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  application_status?: string;
  application_feedback?: string;
  freelancer_id?: string;
  job_offer_id?: string;
}
