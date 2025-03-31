export function FormResultHistory(props: {
  history: { input: string; output: string }[];
}) {
  return (
    <div>
      <h3>Result history</h3>
      <ol>
        {props.history.map((formResult, i) => (
          <li key={i}>{`Input: ${formResult.input}, Output: ${formResult.output}`}</li>
        ))}
      </ol>
    </div>
  );
}
