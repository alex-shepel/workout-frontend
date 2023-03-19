import { useMemo } from 'react';
import { useAxios } from 'hooks/utils';
import { Service } from 'types/common';
import { TrainingEntity } from 'types/entities';

const SERVICE_ENDPOINT = 'trainings';

interface TrainingService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly getCurrent: () => Promise<TrainingEntity>;
  readonly next: () => Promise<TrainingEntity>;
}

const useTrainingService = () => {
  const axios = useAxios();

  return useMemo<TrainingService>(() => {
    const getCurrent: TrainingService['getCurrent'] = async () => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/current`);
      return data;
    };

    const next: TrainingService['next'] = async () => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/next`);
      return data;
    };

    return {
      endpoint: SERVICE_ENDPOINT,
      getCurrent,
      next,
    };
  }, [axios]);
};

export default useTrainingService;
