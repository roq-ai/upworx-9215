import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { useRoqClient, useContractFindFirst } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { contractValidationSchema } from 'validationSchema/contracts';
import { ContractInterface } from 'interfaces/contract';
import { JobOfferInterface } from 'interfaces/job-offer';
import { UserInterface } from 'interfaces/user';

function ContractEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const roqClient = useRoqClient();
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          id,
        },
        'contract',
      ),
    [id],
  );
  const { data, error, isLoading, mutate } = useContractFindFirst(queryParams, {}, { disabled: !id });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ContractInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await roqClient.contract.update({
        data: values as RoqTypes.contract,
        where: {
          id,
        },
      });
      mutate(updated);
      resetForm();
      router.push('/contracts');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ContractInterface>({
    initialValues: data,
    validationSchema: contractValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Contracts',
              link: '/contracts',
            },
            {
              label: 'Update Contract',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Contract
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.contract_status}
            label={'Contract Status'}
            props={{
              name: 'contract_status',
              placeholder: 'Contract Status',
              value: formik.values?.contract_status,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Contract Duration"
            formControlProps={{
              id: 'contract_duration',
              isInvalid: !!formik.errors?.contract_duration,
            }}
            name="contract_duration"
            error={formik.errors?.contract_duration}
            value={formik.values?.contract_duration}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('contract_duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<JobOfferInterface>
            formik={formik}
            name={'job_offer_id'}
            label={'Select Job Offer'}
            placeholder={'Select Job Offer'}
            fetcher={() => roqClient.job_offer.findManyWithCount({})}
            labelField={'salary_range'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'freelancer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/contracts')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'contract',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ContractEditPage);
