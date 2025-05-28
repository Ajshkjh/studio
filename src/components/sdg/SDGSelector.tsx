"use client";

import type { SDG } from '@/lib/sdgs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SDGSelectorProps {
  sdgs: SDG[];
  onSelectSdg: (sdg: SDG) => void;
  selectedSdgId?: number | null;
}

export default function SDGSelector({ sdgs, onSelectSdg, selectedSdgId }: SDGSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
      {sdgs.map((sdg) => {
        const IconComponent = sdg.icon;
        return (
          <Card
            key={sdg.id}
            onClick={() => onSelectSdg(sdg)}
            className={cn(
              "cursor-pointer hover:shadow-xl transition-shadow duration-300 group",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selectedSdgId === sdg.id ? "ring-2 ring-primary shadow-lg" : "shadow-md"
            )}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSdg(sdg);}}
            role="button"
            aria-pressed={selectedSdgId === sdg.id}
            aria-label={`Select ${sdg.title}`}
          >
            <CardHeader className="p-4 items-center text-center">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: sdg.color }}
                aria-hidden="true"
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                {sdg.shortTitle}
              </CardTitle>
            </CardHeader>
            {/* CardContent can be used for a brief description if needed in future */}
            {/* <CardContent className="p-4 pt-0 text-xs text-muted-foreground text-center">
              Short description here...
            </CardContent> */}
          </Card>
        );
      })}
    </div>
  );
}
