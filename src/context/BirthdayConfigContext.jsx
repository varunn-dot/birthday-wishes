import React, { createContext, useContext, useState } from 'react';
import { RAMYA_PHOTO } from '../config/photoConfig';

const BirthdayConfigContext = createContext();

export const BirthdayConfigProvider = ({ children }) => {
  const [birthdayName] = useState('Ramya');
  const [photoUrl] = useState(RAMYA_PHOTO);
  const [isLoading] = useState(false);

  return (
    <BirthdayConfigContext.Provider
      value={{
        birthdayName,
        photoUrl,
        isLoading
      }}
    >
      {children}
    </BirthdayConfigContext.Provider>
  );
};

export const useBirthdayConfig = () => {
  const context = useContext(BirthdayConfigContext);
  if (!context) {
    throw new Error('useBirthdayConfig must be used within a BirthdayConfigProvider');
  }
  return context;
};
