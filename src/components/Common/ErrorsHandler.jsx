import React from 'react';
export const errorUI = (error) => {
    return error && <div className="invalid-feedback">{error}</div>;
  };