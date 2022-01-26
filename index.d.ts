import Parameter from 'parameter'

interface CheckHandlerFunc {
  (rule: any, value: any): string | void;
}

interface ValidateError {
  code: string;
  field?: string;
  message: string;
}

declare module 'egg' {
  export interface Application {
    validator: Parameter;
  }

  export interface Context {
    validate(rule: Parameter.ParameterRules, value: unknown): Parameter.ValidateError[];
  }
}
