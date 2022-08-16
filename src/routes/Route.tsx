import { ComponentType } from "react";
import { Redirect, Route as ReactRoute, RouteProps } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";


interface Props extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const Route = ({ isPrivate = false, component: Component, ...rest}: Props) => {

  const { acessToken } = useAuth()
  return (
    <ReactRoute 
      {...rest} 
      render={() => isPrivate === !!acessToken? (
        <Component/>
      ) : (
        <Redirect to={isPrivate? '/' : '/dashboard'}/>
      )}
    />
  )
}