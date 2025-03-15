export const counterState = $state({
  count: 0
});

export const increment = () => {
  counterState.count += 1;
};

export const decrement = () => {
  counterState.count -= 1;
};
