import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw } from 'lucide-react';
import type { EqualizerBand } from '../../hooks/useEqualizer';

interface EqualizerPanelProps {
  enabled: boolean;
  bands: EqualizerBand[];
  onToggleEnabled: () => void;
  onUpdateBandGain: (index: number, gain: number) => void;
  onReset: () => void;
}

export default function EqualizerPanel({
  enabled,
  bands,
  onToggleEnabled,
  onUpdateBandGain,
  onReset,
}: EqualizerPanelProps) {
  return (
    <Card className="candy-glass border-2 border-primary/30 shadow-2xl shadow-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>10-Band Equalizer</CardTitle>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <div className="flex items-center gap-2">
              <Switch id="eq-enabled" checked={enabled} onCheckedChange={onToggleEnabled} />
              <Label htmlFor="eq-enabled" className="cursor-pointer">
                {enabled ? 'On' : 'Off'}
              </Label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-6">
          {bands.map((band, index) => (
            <div key={band.frequency} className="flex flex-col items-center gap-3">
              <div className="h-48 flex items-end">
                <Slider
                  value={[band.gain]}
                  min={-12}
                  max={12}
                  step={0.5}
                  onValueChange={(values) => onUpdateBandGain(index, values[0])}
                  orientation="vertical"
                  className="h-full"
                  disabled={!enabled}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium">{band.label}</div>
                <div className="text-xs text-muted-foreground">
                  {band.gain > 0 ? '+' : ''}
                  {band.gain.toFixed(1)}dB
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
