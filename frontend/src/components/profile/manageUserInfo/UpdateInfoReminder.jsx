import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const UpdateInfoReminder = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4 flex items-start justify-between rounded">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-1 text-yellow-500" />
        <div>
          <p className="font-semibold">Complete Your Profile</p>
          <p className="text-sm">
            Please update your account information. Verified profiles help other users trust you. 
            Soon, incomplete profiles will no longer be able to list products.
          </p>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-sm text-yellow-700 hover:underline ml-4"
      >
        Dismiss
      </button>
    </div>
  );
};

export default UpdateInfoReminder;
