declare module "*.svg" {
    import type * as React from "react";
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "*.json" {
    const content: string;
    export default content;
}

declare module "*.svg?react" {
    import type { FunctionComponent, SVGAttributes } from "react";
    const content: FunctionComponent<SVGAttributes<SVGElement>>;
    export default content;
}
