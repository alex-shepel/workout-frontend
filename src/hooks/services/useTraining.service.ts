import { useMemo } from 'react';
import { useAxios } from 'hooks/utils';
import { Service } from 'types/common';
import { TemplateEntity, TrainingEntity } from 'types/entities';

const SERVICE_ENDPOINT = 'trainings';

type UpdateCurrentPayload = {
  TemplateID: TemplateEntity['ID'];
};

interface TrainingService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly getCurrent: () => Promise<TrainingEntity>;
  readonly updateCurrent: (payload: UpdateCurrentPayload) => Promise<TrainingEntity>;
  readonly next: () => Promise<TrainingEntity>;
}

const useTrainingService = () => {
  const axios = useAxios();

  return useMemo<TrainingService>(() => {
    const getCurrent: TrainingService['getCurrent'] = async () => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/current`);
      return data;
    };

    const updateCurrent: TrainingService['updateCurrent'] = async payload => {
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/current`, payload);
      return data;
    };

    const next: TrainingService['next'] = async () => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/next`);
      return data;
    };

    return {
      endpoint: SERVICE_ENDPOINT,
      getCurrent,
      updateCurrent,
      next,
    };
  }, [axios]);
};

export default useTrainingService;
