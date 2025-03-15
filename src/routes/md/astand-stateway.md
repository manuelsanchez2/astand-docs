import { createStore, type Store } from 'astand';

interface CounterState {
	count: number;
}

export interface CounterStore extends Store<CounterState> {
	increment: () => void;
	decrement: () => void;
}

const initialState: CounterState = { count: 0 };
const options = {};

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

// Then somewhere else after importing the counterStore
<h1>Counter: {$counterStore.count}</h1>
<button on:click={() => counterStore.increment()}>➕ Increment</button>
<button on:click={() => counterStore.decrement()}>➖ Decrement</button>