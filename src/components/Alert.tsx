import React from 'react';

interface AlertProps {
  message: string;
  type? : string;
}

function Alert({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const AlertBase = ({ message, variantClass }: { message: string; variantClass: string }) => {
  const baseClasses = "alert text-xs max-w-[14rem] absolute z-20 bottom-4 right-4";
  const className = `${baseClasses} ${variantClass}`;

  return (
    <div role="alert" className={className}>
      <span>{message}</span>
    </div>
  );
};

Alert.Success = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-success" />;
Alert.Error = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-error" />;
Alert.Warning = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-warning" />;
Alert.Info = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-info" />;
Alert.Default = ({ message, type="info" }: AlertProps) => <AlertBase message={message} variantClass={"alert-"+type} />;

export default Alert;
