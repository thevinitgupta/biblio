"use client";
import React, { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

interface AlertProps {
  message: string;
  loadingMessage? : string;
  styles ? : string;
  onClick? : (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type? : "submit" | "button" | "reset" | undefined,
  btnDisabled? : boolean
}

function Button({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const ButtonBase = ({ message, loadingMessage, variantClass, onClick, type, btnDisabled = false }: { message: string; loadingMessage : string; variantClass: string, type : "submit" | "button" | "reset" | undefined, onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void, btnDisabled? : boolean} ) => {
    const {pending, data} = useFormStatus();
    const [disabled,setDisabled] = useState<boolean>(btnDisabled);

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
    <button type={type} onClick={onClick} className={className} aria-disabled={disabled} disabled={disabled }>
      {disabled ? <span className="loading loading-spinner text-neutral"></span>:message}
    </button>
  );
};

Button.Primary = ({ message, loadingMessage = "loading", type = "button", styles }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass={`btn-primary ${styles}`} type={type} />;
Button.Secondary = ({ message, loadingMessage = "loading", styles,  type = "button" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass={`btn-secondary ${styles}`} type={type}/>;
Button.Neutral = ({ message, btnDisabled, loadingMessage = "loading", styles, onClick,  type = "button" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass={`btn-neutral ${styles}`} type={type} onClick={onClick} btnDisabled={btnDisabled}/>;
Button.Accent = ({ message, loadingMessage = "loading", styles, onClick, type = "button" }: AlertProps) => <ButtonBase message={message} loadingMessage={loadingMessage} variantClass={`btn-accent ${styles}`} onClick={onClick} type={type} />;
Button.Loading = ({ message, loadingMessage = "loading", styles, onClick, type = "button" }: AlertProps) => (
  <button className="w-full btn btn-neutral text-primary" type={type} disabled>
  <span className="loading loading-spinner"></span>
  {loadingMessage}
</button>
);
// Button. = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-warning" />;
// Alert.Info = ({ message }: AlertProps) => <AlertBase message={message} variantClass="alert-info" />;
// Alert.Default = ({ message, type="info" }: AlertProps) => <AlertBase message={message} variantClass={"alert-"+type} />;

export default Button;