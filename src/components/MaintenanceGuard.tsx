
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

const MaintenanceGuard = ({ children }: MaintenanceGuardProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = () => {
      const hasAccess = localStorage.getItem("maintenance_access") === "granted";
      
      setIsAuthorized(hasAccess);
      setIsLoading(false);
      
      if (!hasAccess) {
        navigate("/maintenance");
      }
    };

    checkAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cinema-black">
        <div className="animate-pulse text-cinema-red text-2xl font-bold">
          Chargement...
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
};

export default MaintenanceGuard;
