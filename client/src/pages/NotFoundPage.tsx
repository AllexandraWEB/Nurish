import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="text-6xl mb-4">🍽️</div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Oops! Recipe Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Looks like this recipe has been eaten! The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="glass-border-button"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <Home size={20} className="mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;