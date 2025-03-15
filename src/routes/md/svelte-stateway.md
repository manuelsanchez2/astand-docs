export const counterState = $state({
	count: 0,
});

export const increment = () => {
	counterState.count += 1;
};

export const decrement = () => {
	counterState.count -= 1;
};

// Then, somewhere else
<button onclick={() => increment()}>Increment</button>
<button onclick={() => decrement()}>Decrement</button>
<span>{counterState.count}</span>