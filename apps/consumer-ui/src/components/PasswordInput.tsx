import * as React from 'react';

import { Input } from './ui/input';
import { Eye, EyeClosedIcon } from 'lucide-react';

interface PasswordInputProps {
  field: any;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ field }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} placeholder="Password" {...field} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
      >
        <span className="sr-only">Toggle password visibility</span>
        {showPassword ? <Eye className="size-4" /> : <EyeClosedIcon className="size-4" />}
      </button>
    </div>
  );
};
