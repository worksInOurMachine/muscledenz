import clsx from 'clsx';
import React from 'react';
import { Dumbbell } from 'lucide-react';

const Loading = ({ height }: { height?: string }) => {
  return (
    <div className={clsx("flex justify-center items-center w-full", height ? height : "h-[90vh]")}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          
          {/* Spinning Dumbbell */}
          <div className="relative animate-[spin_2s_linear_infinite]">
            <Dumbbell className="w-12 h-12 text-primary" strokeWidth={2.5} />
          </div>
        </div>
        
        <div className="space-y-1 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-foreground animate-pulse">
            Loading...
          </p>
          <div className="flex gap-1 justify-center">
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
