import * as React from 'react';

interface LoggingOptions {
  logRender: boolean;
  logProps: boolean;
}

function withLogging<P extends object>(
  Component: React.ComponentType<P>,
  loggingOptions: LoggingOptions
): React.ComponentType<P> {
  const { logRender, logProps } = loggingOptions;

  const componentName = Component.displayName || Component.name || 'Component';

  class WithLogging extends React.Component<P> {
    componentDidMount() {
      if (logRender) {
        console.log(`Rendering component: ${componentName}`);
      }
      if (logProps) {
        console.log(`Component props: ${JSON.stringify(this.props)}`);
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  WithLogging.displayName = `WithLogging(${componentName})`;

  return WithLogging;
}

interface WithLoggingOptions {
  logRender: boolean;
  logProps: boolean;
}

function WithLogging(options: WithLoggingOptions) {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        withLogging(this, options);
      }
    };
  };
}

interface MyComponentProps {
  props: {
    name: string;
  };
}

@WithLogging({ logRender: true, logProps: true })
class MyComponent extends React.Component<MyComponentProps> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}

function HOCBuilderComponent() {
  return (
    <div>
      <MyComponent name="Alice" />
      <MyComponent name="Clint" />
    </div>
  );
}

export default HOCBuilderComponent;
