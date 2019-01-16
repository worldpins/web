import developmentConfig from './development';
import productionConfig from './production';

const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return productionConfig;
  }
  return developmentConfig;
};

export default getConfig;
