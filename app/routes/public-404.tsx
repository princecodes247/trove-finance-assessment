import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { AuthCard } from "~/components/ui/auth-card";
import { MdOutlineExplore, MdOutlineHelpOutline } from "react-icons/md";

export default function Public404() {
  return (
    <AuthCard>
      <div className="flex flex-col items-center text-center py-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <MdOutlineHelpOutline className="w-10 h-10 text-primary animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-text-default tracking-tight mb-3">404</h1>
        <h2 className="text-xl font-semibold text-text-default mb-2">Lost in space</h2>
        <p className="text-sm text-text-neutral mb-8 px-4 leading-relaxed">
          The page you're looking for doesn't exist, has been renamed, or is temporarily unavailable.
        </p>

        <div className="w-full space-y-3">
          <Link to="/" className="block">
            <Button className="w-full">Return Home</Button>
          </Link>
          <Link to="/login" className="block">
            <Button variant="secondary" className="w-full">Go to Login</Button>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
