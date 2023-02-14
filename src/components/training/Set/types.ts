import { SetEntity } from 'types/entities';
import useSetService from 'hooks/services/useSet.service';
import { Flatten } from 'types/utils';

interface UpdatePayload extends Flatten<Parameters<ReturnType<typeof useSetService>['update']>> {}

export interface Props {
  set: SetEntity;
  onUpdate: (values: UpdatePayload) => void;
}

export interface FormValues extends Pick<UpdatePayload, 'Weight' | 'Repetitions'> {}
