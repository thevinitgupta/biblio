"use client";
import React, {useEffect, useState} from 'react';

interface AlertProps {
  message: string;
  type? : string;
  timer? : number
}

function Alert({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const AlertBase = ({ message, variantClass, timer=3500 }: { message: string; variantClass: string, timer? :number }) => {
  const [showAlert,setShowAlert] = useState<boolean>(true);
  const baseClasses = "alert text-xs max-w-[14rem] absolute z-20 bottom-4 right-4";
  const className = `${baseClasses} ${variantClass}`;

  useEffect(()=>{
    const timerId = setTimeout(() => {
      setShowAlert(false);
    }, timer);
    return () => clearTimeout(timerId);
  })

  if(!showAlert) return null;
  
  return (
    <div role="alert" className={className}>
      <span>{message}</span>
    </div>
  );
};

Alert.Success = ({ message, timer }: AlertProps) => <AlertBase message={message} variantClass="alert-success" timer={timer} />;
Alert.Error = ({ message, timer }: AlertProps) => <AlertBase message={message} variantClass="alert-error" timer={timer} />;
Alert.Warning = ({ message, timer }: AlertProps) => <AlertBase message={message} variantClass="alert-warning" timer={timer} />;
Alert.Info = ({ message, timer }: AlertProps) => <AlertBase message={message} variantClass="alert-info" timer={timer} />;
Alert.Default = ({ message, type="info", timer=3500 }: AlertProps) => <AlertBase message={message} variantClass={"alert-"+type} timer={timer} />;

export default Alert;
