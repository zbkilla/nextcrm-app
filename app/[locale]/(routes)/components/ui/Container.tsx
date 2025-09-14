import React from "react";

interface ContainerProps {
  title: string;
  description: string;
  visibility?: string;
  children: React.ReactNode;
}

const Container = ({
  title,
  description,
  visibility,
  children,
}: ContainerProps) => {
  return (
    <div className="flex-1 h-full overflow-hidden">
      <div className="text-sm h-full overflow-auto pb-32 space-y-5">
        {children}
      </div>
    </div>
  );
};

export default Container;
