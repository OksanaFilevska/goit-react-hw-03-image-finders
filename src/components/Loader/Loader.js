import React from 'react';
import Loader from 'react-loader-spinner';

import s from './Loader.module.css';

const LoaderOn = () => {
  return (
    <div className={s.Loader}>
      <Loader type="Circles" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default LoaderOn;