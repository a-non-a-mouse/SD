import React, { useState, useEffect } from 'react';

import App from '../app/app';
import Password from '../password/password';
import { userDetails } from '../../user-details';
import { Encryptor } from '../../utils/encrypt';
import { hash } from '../../utils/hash';

async function decryptUserDetails(password: string) {
  const hashedPassword = await hash(password);
  const encryptor = new Encryptor(hashedPassword);
  const decrypted = {} as typeof userDetails;
  for (const [key, value] of Object.entries(userDetails)) {
    decrypted[key as keyof typeof userDetails] = await encryptor.decrypt(value);
  }
  localStorage.setItem('password', hashedPassword);
  return decrypted;
}

const handleDecryption = (
  password: string,
  setDecryptedDetails: React.Dispatch<
    React.SetStateAction<typeof userDetails | null>
  >
) => {
  decryptUserDetails(password)
    .then((decrypted) => {
      setDecryptedDetails(decrypted);
    })
    .catch((error) => {
      console.error('Decryption failed:', error);
    });
};

const AppLoader: React.FC = () => {
  const [decryptedDetails, setDecryptedDetails] = useState<
    typeof userDetails | null
  >(null);
  const [password, setPassword] = useState<string | null>(
    localStorage.getItem('password')
  );

  useEffect(() => {
    if (password) {
      handleDecryption(password, setDecryptedDetails);
    }
  }, [password]);

  if (!decryptedDetails) {
    return <Password onSubmit={setPassword} />;
  }

  return <App userDetails={decryptedDetails} />;
};

export default AppLoader;
