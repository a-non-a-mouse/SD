import React, { useState, useEffect } from 'react';
import { Encryptor } from '../../utils/encrypt';

interface DecryptedTextProps {
  encryptor: Encryptor;
  encryptedContent: string;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  encryptor,
  encryptedContent,
}) => {
  const [decryptedText, setDecryptedText] = useState<string>('');

  useEffect(() => {
    const decrypt = async () => {
      try {
        const decrypted = await encryptor.decrypt(encryptedContent);
        setDecryptedText(decrypted);
      } catch (error) {
        console.error('Decryption failed:', error);
        setDecryptedText('Decryption failed');
      }
    };

    decrypt();
  }, [encryptor, encryptedContent]);

  return <div>{decryptedText}</div>;
};
