import 'assets/styles/index.css';
import ReactDOM from 'react-dom/client';
import { WeatherContextProvider } from 'context';
import { App } from 'components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WeatherContextProvider>
    <App />
  </WeatherContextProvider>,
);
