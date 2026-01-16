import React from 'react';
import { useTheme } from '../themes/ThemeContext';

export const SchwälmerBackground: React.FC = () => {
  const theme = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Clean solid background - matching schwaelmer-softwarehaus.de */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme.colors.background }}
      />
    </div>
  );
};
