import { svgComponents } from './Svg';

export const Icon = (props) => {
  const { name, ...otherProps } = props;

  const SvgComponent = svgComponents[name];

  if (!SvgComponent) {
    return null;
  }

  return <SvgComponent {...otherProps} />;
};
