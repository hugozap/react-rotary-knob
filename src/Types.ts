//Point
export interface Point {
    x: number;
    y: number;
}

/**
 * Type definition for the skin element manipulation block
 */
export type UpdateElement = {
    element: string,
    content: ((props: any, value: any) => string) | null,
    attrs: Array<AttributeSetValue>
  };


/**
 * type definition for the skin system attribute modification element
 */
export type AttributeSetValue = {
    name: string,
    value: (props: any, value: any) => string
  };
