import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FolderOpen } from 'lucide-react';

interface FilePickerButtonProps {
  onFilesSelected: (files: File[]) => void;
}

export default function FilePickerButton({ onFilesSelected }: FilePickerButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input so same files can be selected again
    e.target.value = '';
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".mp3,audio/mpeg"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <Button onClick={handleClick} variant="outline" className="gap-2">
        <FolderOpen className="w-4 h-4" />
        Add MP3 Files
      </Button>
    </>
  );
}
