import * as React from 'react';

interface UserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
}

class UserBuilder {
  private props: UserProps;

  constructor() {
    this.props = {};
  }

  withFirstName(firstName: string): UserBuilder {
    this.props.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.props.lastName = lastName;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.props.email = email;
    return this;
  }

  withAvatarUrl(avatarUrl: string): UserBuilder {
    this.props.avatarUrl = avatarUrl;
    return this;
  }

  build(): JSX.Element {
    return <User {...this.props} />;
  }
}

function User(props: UserProps) {
  return (
    <div>
      {props.avatarUrl && (
        <img src={props.avatarUrl} alt="Avatar" width={50} height={50} />
      )}
      {props.firstName && <p>{props.firstName}</p>}
      {props.lastName && <p>{props.lastName}</p>}
      {props.email && <p>{props.email}</p>}
    </div>
  );
}

function UserBuilderComponent() {
  const user1 = new UserBuilder()
    .withFirstName('John')
    .withEmail('john@example.com')
    .build();
  const user2 = new UserBuilder()
    .withFirstName('Jane')
    .withLastName('Doe')
    .withAvatarUrl('https://cdn-icons-png.flaticon.com/512/149/149071.png')
    .build();

  return (
    <div>
      {user1}
      {user2}
    </div>
  );
}

export default UserBuilderComponent;
