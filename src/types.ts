export {};

declare global  {
	interface Window {
		setImmediate: TFuncSetImmediate;
		clearImmediate: TFuncClearImmediate;
	}
}

export type TSetImmediate = number;
export type TClearImmediate = Error | boolean;

export type TFuncSetImmediate = () => number;
export type TFuncClearImmediate = (id: number) => Error | boolean;

export type TState = {
	storage: {
		[key: string]: number | Array<any>;
	};
	uid: number;
	firstCall: boolean;
}
