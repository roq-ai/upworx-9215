import * as yup from 'yup';

export const contractValidationSchema = yup.object().shape({
  contract_status: yup.string().nullable(),
  contract_duration: yup.number().integer().nullable(),
  job_offer_id: yup.string().nullable().required(),
  freelancer_id: yup.string().nullable().required(),
});
