import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePreferenceSync } from '../../hooks/usePreferenceSync';
import { Cloud, CloudOff } from 'lucide-react';
import { toast } from 'sonner';

export default function PreferenceSyncControls() {
  const { isAuthenticated, syncToRemote, isSyncing } = usePreferenceSync();

  const handleSync = async () => {
    try {
      await syncToRemote();
      toast.success('Preferences synced to cloud');
    } catch (error) {
      toast.error('Failed to sync preferences');
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="candy-glass border-2 border-muted/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CloudOff className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg">Cloud Sync</CardTitle>
          </div>
          <CardDescription>
            Login to sync your preferences across devices
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="candy-glass border-2 border-primary/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Cloud Sync</CardTitle>
        </div>
        <CardDescription>
          Your preferences are automatically synced when you login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSync} disabled={isSyncing} className="gap-2">
          <Cloud className="w-4 h-4" />
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </Button>
      </CardContent>
    </Card>
  );
}
