"use client";
import useButtonDisabled from '@/hooks/useButtonDisabled';
import React from 'react';
import { useFormStatus } from 'react-dom';

interface AlertProps {
  message: string;
  loadingMessage? : string;
}

function Button({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const ButtonBase = ({ message, loadingMessage, variantClass }: { message: string; loadingMessage : string; variantClass: string }) => {
    const {pending} = useFormStatus();
    const isDisabled = useButtonDisabled(pending);

  const baseClasses = "w-full btn";
  const className = `${baseClasses} ${variantClass}`;

  return (
    <button className={className} aria-disabled={pending} disabled={pending}>{pending ? loadingMessage:message}</button>
  );
};

Button.Primary = ({ message, loadingMessage = "loading" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass="btn-primary" />;
Button.Secondary = ({ message, loadingMessage = "loading" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass="btn-secondary" />;
// Button. = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-warning" />;
// Alert.Info = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-info" />;
// Alert.Default = ({ message, type="info" }: AlertProps) => <AlertBase message={message} variantClass={"alert-"+type} />;

export default Button;