// src/components/ProtectedComponent.tsx
import useEnsureAuth from "@/hooks/useEnsureAuth";

const ProtectedComponent = ({ children }: { children: React.ReactNode }) => {
  useEnsureAuth(); // Ensure the user is authenticated before rendering children

  return <>{children}</>;
};

export default ProtectedComponent;
