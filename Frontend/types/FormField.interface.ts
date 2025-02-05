export default interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  options?: string[];
  required: boolean;
}
