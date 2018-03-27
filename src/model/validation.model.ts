export class Validation {
  rule: string;
  className: string;
  error: string;


  constructor(params: Partial<Validation>) {
    const {rule, className, error} = params;
    this.rule = rule;
    this.className = className;
    this.error = error;
  }
}