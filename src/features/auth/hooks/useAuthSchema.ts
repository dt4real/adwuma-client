import { useState } from 'react';
import { IDynamic, ValidationErrorType } from 'src/shared/shared.interface';
import { ValidationError } from 'yup';

import { IUseAuthSchema } from '../interfaces/auth.interface';

const useAuthSchema = ({ schema, userInfo }: IUseAuthSchema): [() => Promise<boolean>, ValidationErrorType[]] => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);

  async function schemaValidation(): Promise<boolean> {
    try {
      await schema.validate(userInfo, { abortEarly: false });
      setValidationErrors([]);
      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: ValidationErrorType[] = err.inner.map((error) => ({
          path: error.path!,
          message: (error.message as unknown as IDynamic)[error.path!]
        }));
        setValidationErrors(errors);
      }
      return false;
    }
  }

  return [schemaValidation, validationErrors];
};

export { useAuthSchema };
