import { Link } from "react-router";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Login() {
  return (
    <form className="space-y-6" action="#" method="POST">
      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        autoComplete="email"
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        required
      />

      <div>
        <Button type="button" className="!p-0">
          <Link to="/dashboard" className="w-full h-full flex justify-center items-center py-2 px-4">Sign in</Link>
        </Button>
      </div>
    </form>
  );
}
