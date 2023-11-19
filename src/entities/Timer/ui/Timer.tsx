interface TimerProps {
  className?: string;
}

export const Timer = ({}: TimerProps) => {
  return (
    <div>
      <div>00:00</div>
      <div>Status</div>
      <div>Controls</div>
    </div>
  );
};
