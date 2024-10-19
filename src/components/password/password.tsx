import React, { useState } from 'react';
import './Password.css';

interface PasswordProps {
  onSubmit: (password: string) => void;
}

const Password: React.FC<PasswordProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Password;
