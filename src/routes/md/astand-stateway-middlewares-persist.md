[... same code as before + importing the middlewares] 
import { createStore, type Store, consoleLogMiddleware, validationMiddleware } from 'astand';

const options = {
	middleware: [
		consoleLogMiddleware,
		validationMiddleware(
			[
				{
					predicate: (s: { count: number }) => s.count >= 0,
					message: 'Count must be non-negative',
					level: 'error'
				}
			])
		],
	persist: { key: 'counterStore', storage: 'local' }
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

// Then somewhere else after importing the counterStore
<h1>Counter: {$counterStore.count}</h1>
<button on:click={() => counterStore.increment()}>➕ Increment</button>
<button on:click={() => counterStore.decrement()}>➖ Decrement</button>