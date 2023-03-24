import * as React from 'react';
import HOCBuilderComponent from './src/HOCBuilder';
import FormBuilderComponent from './src/components/FormBuilder';
import UserBuilderComponent from './src/components/UserBuilder';
import './style.css';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <FormBuilderComponent />
      <UserBuilderComponent />
      <HOCBuilderComponent />
    </div>
  );
}
