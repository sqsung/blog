import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="absolute top-0 w-full [&>span>span]:bg-blue-400 [&>span]:bg-primary">
      <LinearProgress
        variant="determinate"
        value={progress}
        className="h-[5px] w-full"
      />
    </div>
  );
}
