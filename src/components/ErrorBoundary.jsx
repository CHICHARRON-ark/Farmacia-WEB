import { Component } from 'react';
import Button from './ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error en la aplicación:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.replace(`${import.meta.env.BASE_URL}#/`);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container page empty-state">
          <h1>Algo salió mal</h1>
          <p>Hubo un error inesperado. Puedes volver al inicio e intentar de nuevo.</p>
          <Button variant="primary" onClick={this.handleReset}>
            Ir al inicio
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
