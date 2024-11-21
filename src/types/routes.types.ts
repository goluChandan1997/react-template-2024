export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  auth?: boolean;
}
