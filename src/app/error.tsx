"use client";
type ErrorPropsType = {
  error: Error;
  reset: () => void;
};
const error = ({ error, reset }: ErrorPropsType) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      {error.message} <button onClick={() => reset()}>Reset Error</button>
    </div>
  );
};

export default error;
