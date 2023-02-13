type FormErrors<T extends object> = Partial<Record<keyof T, string | null>>;

export default FormErrors;
