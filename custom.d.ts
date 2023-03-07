declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.jpg" {
  const value: string;
  export = value;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}
