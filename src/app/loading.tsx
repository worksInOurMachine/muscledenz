import clsx from 'clsx';
import React from 'react';

const Loading = ({ height }: { height?: string }) => {
  return (
    <div className={clsx("flex justify-center items-center w-full", height ? height : "h-[90vh]")}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading…</p>
      </div>
    </div>
  );
};

export default Loading;
