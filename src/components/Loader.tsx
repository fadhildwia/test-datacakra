import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoaderProps extends React.HTMLAttributes<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <LoaderCircle
        size={size}
        color={color}
        className={cn('animate-spin', className)}
        {...props}
      />
    </div>
  );
};

export default Loader;