'use strict';

import {TClearImmediate, TFuncClearImmediate, TFuncSetImmediate, TSetImmediate, TState} from "./types";

if (!window.hasOwnProperty('setImmediate')) {
	const message: string = 'setImmediatePolyfillMessage';
	const slice: Array<any>['slice'] = Array.prototype.slice;

	const state: TState = {
		storage: {},
		uid: 0,
		firstCall: true,
	};

	function fastApply(args: Function[]): Function {
		const func: Function = args[0];

		switch (args.length) {
			case 1:
				return func();
			case 2:
				return func(args[1]);
			case 3:
				return func(args[1], args[2]);
		}
		
		return func.apply(window, slice.call(args, 1));
	}

	function callback(event: MessageEvent) {
		const key = event.data;
		let data;
		if (typeof key == 'string' && key.indexOf(message) == 0) {
			data = state.storage[key];
			if (data) {
				delete state.storage[key];
				fastApply(data);
			}
		}
	}

	function setImmediate(): TSetImmediate {
		const id = state.uid++;
		const key = message + id;

		let i = arguments.length;
		let args = new Array(i);

		while (i--) {
			args[i] = arguments[i];
		}

		state.storage[key] = args;
		
		if (state.firstCall) {
			state.firstCall = false;
			window.addEventListener('message', callback);
		}
		window.postMessage(key, '*');

		return id
	}

	function clearImmediate(id: number): TClearImmediate {
		if (!id || typeof id !== 'number') return new Error('argument "id" was not specified or type is invalid');
		delete state.storage[message + id];
		return true;
	}


	(<TFuncSetImmediate>window.setImmediate) = setImmediate;
	(<TFuncClearImmediate>window.clearImmediate) = clearImmediate;
}
