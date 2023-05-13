import * as React from 'react';
import './style.css';

export default function App() {
  const [progressBars, setProgressBars] = React.useState(0);
  const [barInProgress, setBarInProgress] = React.useState(-1);
  const [progress, setProgress] = React.useState(-1);
  const [timeoutId, setTimeoutId] = React.useState(0);

  React.useEffect(() => {
    if (progressBars > 0 && barInProgress < 0) {
      setBarInProgress(barInProgress + 1);
    } else if (barInProgress === progressBars - 2 && progress === 100) {
      setBarInProgress(barInProgress + 1);
    }
  }, [progressBars]);

  React.useEffect(() => {
    if (barInProgress >= 0) setProgress(0);
  }, [barInProgress]);

  React.useEffect(() => {
    if (progress < 0) return;

    if (progress === 100) {
      clearTimeout(timeoutId);
      if (barInProgress < progressBars - 1) setBarInProgress(barInProgress + 1);
    } else {
      updateProgress();
    }
  }, [progress]);

  const updateProgress = () => {
    setTimeoutId(
      setTimeout(() => {
        setProgress(progress + 25);
      }, 1000)
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          setProgressBars(progressBars + 1);
        }}
      >
        Add progress bar
      </button>
      {Array.from({ length: progressBars }).map((_, index) => {
        return (
          <div
            key={Date.now() + index}
            style={{
              height: '20px',
              marginTop: '20px',
              background: 'lightgrey',
            }}
          >
            <div
              style={{
                width:
                  index < barInProgress
                    ? '100%'
                    : index === barInProgress
                    ? `${progress}%`
                    : '0%',
                height: '100%',
                background: 'black',
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
