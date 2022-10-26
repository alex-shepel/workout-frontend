import React, { Component, ReactNode } from 'react';
import { Snackbar } from '@mui/material';

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

class ReactErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    return (
      <>
        {this.props.children}
        <Snackbar
          open={this.state.error !== null}
          autoHideDuration={5000}
          onClose={() => this.setState({ error: null })}
          message={
            <span>
              Unexpected behaviour occurred. Please share your experience{' '}
              <a href="mailto:iam.alex.shepel@gmail.com">with me</a>
            </span>
          }
        />
      </>
    );
  }
}

export default ReactErrorBoundary;
