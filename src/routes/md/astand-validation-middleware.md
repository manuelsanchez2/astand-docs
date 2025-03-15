import { createStore, type Store, consoleLogMiddleware } from 'astand';

interface CounterState {
	count: number;
}

export interface CounterStore extends Store<CounterState> {
	increment: () => void;
	decrement: () => void;
}

const initialState: CounterState = { count: 0 };
const options = {
    middleware: [
		validationMiddleware(
				[
					{
						predicate: (s: { count: number }) => s.count >= 0,
						message: 'Count must be non-negative',
						level: 'error'
					},
					{
						predicate: (s: CounterState) => s.count <= 10,
						message: 'Count should be 10 or less',
						level: 'warn'
					},
					{
						predicate: (s: CounterState) => s.count % 10 !== 0,
						message: 'You reached a multiple of 10!',
						level: 'log'
					}
				]
			)
		];
};

const baseCounterStore = createStore<CounterState>(initialState, options);

export const counterStore: CounterStore = {
	...baseCounterStore,
	increment: () => {
		baseCounterStore.setState((prev) => ({ count: prev.count + 1 }));
	},
	decrement: () => {
		baseCounterStore.setState((prev) => ({ count: prev.count - 1 }));
	}
};