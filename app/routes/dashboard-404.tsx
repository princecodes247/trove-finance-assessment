import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function Dashboard404() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 min-h-[60vh]">
      <div className="max-w-md w-full text-center space-y-6 flex flex-col items-center">
        <div className="w-24 h-24 flex items-center justify-center">
          <FileQuestion className="w-12 h-12 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-text-default tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold text-text-default">Page Not Found</h2>
          <p className="text-sm text-text-neutral pt-2 px-4">
            We couldn't find the page you're looking for inside the dashboard. It might have been removed or you may have followed a broken link.
          </p>
        </div>

        <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button className="shadow-sm px-6">
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/dashboard/portfolio">
            <Button variant="secondary" className="px-6">
              View Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
