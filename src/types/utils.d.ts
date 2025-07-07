export type Callback<T extends any[] = any[], R = any> = (...args: T) => R;
export type AsyncCallback<T extends any[] = any[], R extends Promise<any> = Promise<any>> = (...args: T) => R;

export type Maybe<T> = T | undefined;
export type MaybeNull<T> = T | null;
export type MaybeArray<T> = T | T[];
export type MaybePromise<T> = T | Promise<T>;
export type Unpack<T> = T extends (infer U)[] ? U : T extends readonly (infer U)[] ? U : never;

export type RequiredNonNull<T, K extends keyof T = keyof T> = Omit<T, K> & {
    [P in K]-?: P extends K ? NonNullable<T[P]> : T[P];
};
export type RequiredProps<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
export type OptionalProp<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ExtractKeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
export type DefinedPropertiesOnly<S extends object> = Pick<S, DefinedKeys<S>>;
export type DefinedKeys<S extends object, K = keyof S> = Extract<K, K extends keyof S ? (S[K] extends undefined ? never : K) : never>;

export type TypeMapper<T, U extends [unknown, unknown][]> = T extends U[number][0]
    ? Extract<U[number], [T, unknown]>[1]
    : T extends (infer A)[]
      ? TypeMapper<A, U>[]
      : T extends Record<any, any>
        ? { [K in keyof T]: TypeMapper<T[K], U> }
        : T;

export type ColorRGB = `${number} ${number} ${number}`;

export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;
