interface CheckHandlerFunc {
  (rule: any, value: any): string | void;
}

interface ValidateError {
  code: string;
  field?: string;
  message: string;
}

import Parameters from 'parameter';

declare module 'egg' {
  export interface Application {
    validator: {
      addRule: (type: string, check: RegExp | CheckHandlerFunc) => void;
      validate: (rules: any, data: any) => ValidateError[];
    };
  }

  export interface Context {
    validate: Parameters['validate'];
  }
}
