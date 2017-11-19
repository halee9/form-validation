export const onChange = value => {
  return { type: "onchange", payload: value }
};

export const onSubmit = form => {
  return { type: "onsubmit", payload: form }
};
