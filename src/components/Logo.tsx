import { HandHeart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <HandHeart className="h-7 w-7 text-primary" />
      <span className="text-xl font-headline font-bold">FundScan</span>
    </div>
  );
}
