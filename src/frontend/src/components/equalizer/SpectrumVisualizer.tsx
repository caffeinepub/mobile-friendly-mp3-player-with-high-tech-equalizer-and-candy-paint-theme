import { useEffect, useRef } from 'react';

interface SpectrumVisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export default function SpectrumVisualizer({ analyser, isPlaying }: SpectrumVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isPlaying) {
        // Draw idle state
        ctx.fillStyle = 'oklch(var(--background))';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = canvas.width / 64;
        const idleHeight = 4;
        
        for (let i = 0; i < 64; i++) {
          const x = i * barWidth;
          const y = canvas.height - idleHeight;
          
          const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
          gradient.addColorStop(0, 'oklch(var(--primary) / 0.3)');
          gradient.addColorStop(1, 'oklch(var(--accent) / 0.5)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth - 2, idleHeight);
        }
        return;
      }

      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'oklch(var(--background))';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / 64;
      let x = 0;

      for (let i = 0; i < 64; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        const y = canvas.height - barHeight;

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, 'oklch(var(--primary))');
        gradient.addColorStop(0.5, 'oklch(var(--accent))');
        gradient.addColorStop(1, 'oklch(var(--primary))');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'oklch(var(--primary) / 0.5)';
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        ctx.shadowBlur = 0;

        x += barWidth;
      }
    };

    draw();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-32 md:h-48 rounded-lg"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
