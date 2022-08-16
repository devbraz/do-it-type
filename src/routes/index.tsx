import { Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Signup } from "../pages/Signup";
import { useAuth } from "../providers/AuthContext";
import { Route } from "./Route";

export const Routes = () => {
	const { acessToken } = useAuth();
	return (
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/signup" component={Signup} />
			<Route path="/dashboard" component={Dashboard} isPrivate />
			<Route component={NotFound} isPrivate={!!acessToken} />
		</Switch>
	);
};
