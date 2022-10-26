interface IProps {
  goal: 'Exercise' | 'Group' | 'Template';
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export type { IProps };
