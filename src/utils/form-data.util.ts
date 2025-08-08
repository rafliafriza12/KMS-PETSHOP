/* eslint-disable @typescript-eslint/no-explicit-any */
export function objectToFormData(
  obj: Record<string, any>,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];

      if (value === undefined) {
        continue;
      }

      if (value instanceof Date) {
        formData.append(formKey, value.toISOString());
      } else if (value instanceof Array) {
        value.forEach((element, index) => {
          const arrayKey = `${formKey}[${index}]`;

          if (typeof element === 'object' && element !== null) {
            objectToFormData(element, formData, arrayKey);
          } else {
            formData.append(arrayKey, element);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        objectToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  }

  return formData;
}
