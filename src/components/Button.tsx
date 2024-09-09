"use client";
import React, { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

interface AlertProps {
  message: string;
  loadingMessage? : string;
}

function Button({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const ButtonBase = ({ message, loadingMessage, variantClass }: { message: string; loadingMessage : string; variantClass: string }) => {
    const {pending, data} = useFormStatus();
    const [disabled,setDisabled] = useState<boolean>(false);

  const baseClasses = "w-full btn";
  const className = `${baseClasses} ${variantClass}`;

  useEffect(()=> {
    let timerId: NodeJS.Timeout | null  = null;

    if(pending) setDisabled(true);
    else{
      timerId = setTimeout(()=> {
        setDisabled(false);
      },700)
    }

    return () => {
      timerId && clearTimeout(timerId)}
  },[pending,data])

  return (
    <button className={className} aria-disabled={disabled} disabled={disabled }>
      {disabled ? <span className="loading loading-spinner text-neutral"></span>:message}
    </button>
  );
};

Button.Primary = ({ message, loadingMessage = "loading" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass="btn-primary" />;
Button.Secondary = ({ message, loadingMessage = "loading" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass="btn-secondary" />;
// Button. = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-warning" />;
// Alert.Info = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-info" />;
// Alert.Default = ({ message, type="info" }: AlertProps) => <AlertBase message={message} variantClass={"alert-"+type} />;

export default Button;