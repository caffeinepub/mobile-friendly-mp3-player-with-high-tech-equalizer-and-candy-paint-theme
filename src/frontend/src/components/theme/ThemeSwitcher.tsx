import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';
import { themes } from '../../theme/themes';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change theme">
          <Palette className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={currentTheme === theme.id ? 'bg-accent' : ''}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-foreground/20"
                style={{
                  background: `oklch(${theme.colors.primary})`,
                }}
              />
              {theme.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
