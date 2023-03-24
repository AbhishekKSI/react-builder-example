import * as React from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email';
  required: boolean;
  value: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
}

class FormBuilder {
  private fields: FormField[];

  constructor() {
    this.fields = [];
  }

  addField(name: string, label: string, type: 'text' | 'password' | 'email') {
    this.fields.push({
      name,
      label,
      type,
      required: false,
      value: '',
    });

    return this;
  }

  makeRequired() {
    this.fields.map((item) => {
      item.required = true;
      return item;
    });

    return this;
  }

  build(submitCallback): FormProps {
    return {
      fields: this.fields,
      onSubmit: submitCallback,
    };
  }
}

function Form(props: FormProps) {
  const { fields, onSubmit } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <input
            type={field.type}
            name={field.name}
            required={field.required}
            onChange={(event) => {
              field.value = event.currentTarget.value;
            }}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

function FormBuilderComponent() {
  const form = React.useRef(
    new FormBuilder()
      .addField('firstName', 'First name', 'text')
      .addField('lastName', 'Last name', 'text')
      .addField('email', 'Email', 'email')
      .makeRequired()
      .build((data: any) => {
        console.log('Form submitted with data:', data);
      })
  );

  return (
    <div>
      <h1>Sign up form</h1>
      <Form {...form.current} />
    </div>
  );
}

export default FormBuilderComponent;
