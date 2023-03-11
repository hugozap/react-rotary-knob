declare module "react-svgmt" {
    interface SvgLoaderProps {
      svgXML: string;
      onSVGReady?: (element:SVGSVGElement) => void;
      pathPrefix?: string;
      children?: React.ReactNode;
      style?: React.CSSProperties;
    }
  
    export class SvgLoader extends React.Component<SvgLoaderProps> {}
  
    interface SvgProxyProps {
      selector: string;
      onElementSelected?: (element: SVGElement) => void;
      [attribute: string]: any;
    }
  
    export class SvgProxy extends React.Component<SvgProxyProps> {}
  }
  