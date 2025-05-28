"use client";

import type { SDG } from '@/lib/sdgs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Info, Zap, ListChecks } from 'lucide-react'; // Zap for actionable, ListChecks for resources
import Link from 'next/link';

interface GoalDetailsProps {
  sdg: SDG;
  explanation: string | null;
  actionableSteps: string | null;
  isLoadingExplanation: boolean;
  isLoadingSteps: boolean;
}

const SectionSkeleton = () => (
  <div className="space-y-3 mt-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

export default function GoalDetails({
  sdg,
  explanation,
  actionableSteps,
  isLoadingExplanation,
  isLoadingSteps,
}: GoalDetailsProps) {
  const IconComponent = sdg.icon;

  const renderActionableSteps = (steps: string | null) => {
    if (!steps) return <p className="text-muted-foreground">No actionable steps available.</p>;
    return (
      <ul className="list-disc list-outside space-y-2 pl-5 text-sm">
        {steps.split('\n').map((step, index) => {
          const cleanedStep = step.trim().replace(/^\d+\.\s*/, ''); // Remove numbering like "1. "
          return cleanedStep ? <li key={index}>{cleanedStep}</li> : null;
        })}
      </ul>
    );
  };

  return (
    <div className="mt-10 animate-fadeIn">
      <Card className="mb-8 shadow-lg overflow-hidden">
        <CardHeader 
            className="p-6 flex flex-row items-center gap-4"
            style={{ backgroundColor: sdg.color, borderBottom: `5px solid ${sdg.color}`}}
        >
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">{sdg.title}</CardTitle>
            <CardDescription className="text-white/90 text-sm">{sdg.shortTitle}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-6 h-6" />
              <CardTitle className="text-xl">About This Goal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingExplanation ? (
              <SectionSkeleton />
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {explanation || "No explanation available."}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
             <div className="flex items-center gap-2 text-accent">
                <Zap className="w-6 h-6" /> {/* Changed icon to Zap for "action" */}
                <CardTitle className="text-xl">What You Can Do</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingSteps ? (
              <SectionSkeleton />
            ) : (
              renderActionableSteps(actionableSteps)
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 text-primary">
            <ListChecks className="w-6 h-6" /> {/* Changed icon */}
            <CardTitle className="text-xl">Learn More & Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {sdg.resources.length > 0 ? (
            <ul className="space-y-2">
              {sdg.resources.map((resource) => (
                <li key={resource.url} className="text-sm">
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 hover:underline transition-colors group"
                  >
                    {resource.name}
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No specific resources listed for this goal.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
