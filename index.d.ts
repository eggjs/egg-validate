interface CheckHandlerFunc {
  (rule: any, value: any): string | void;
}

interface ValidateError {
  code: string;
  field?: string;
  message: string;
}

declare module 'egg' {
  import Parameter from 'parameter'
  export interface Application {
    validator: Parameter;
  }

  export interface Context {
    validate: (rules: Parameter.ParameterRules, data?: unknown) => void;
  }
}
