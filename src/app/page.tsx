"use client";

import { useState, useEffect, Suspense } from 'react';
import type { SDG } from '@/lib/sdgs';
import { sdgs as allSdgs } from '@/lib/sdgs';
import { explainGoal } from '@/ai/flows/explain-goal';
import { generateActionableSteps } from '@/ai/flows/actionable-steps';

import SDGSelector from '@/components/sdg/SDGSelector';
import GoalDetails from '@/components/sdg/GoalDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
// Use your project's cn utility
import { cn } from '@/lib/utils'; // Make sure this import is correct
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Use existing Card components

export default function Home() {
  const [selectedSdg, setSelectedSdg] = useState<SDG | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [actionableSteps, setActionableSteps] = useState<string | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isLoadingSteps, setIsLoadingSteps] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  const handleSelectSdg = async (sdg: SDG) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSelectedSdg(sdg);
    setExplanation(null);
    setActionableSteps(null);
    setError(null);

    setIsLoadingExplanation(true);
    setIsLoadingSteps(true);

    try {
      const explanationResult = await explainGoal({ sdg: sdg.title });
      setExplanation(explanationResult.explanation || "No explanation available at this moment.");
    } catch (e) {
      console.error("Error fetching explanation:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to generate explanation: ${errorMessage}`);
      setExplanation("Could not load explanation due to an error.");
    } finally {
      setIsLoadingExplanation(false);
    }

    try {
      const stepsResult = await generateActionableSteps({ sdgGoal: sdg.title });
      setActionableSteps(stepsResult.actionableSteps || "No actionable steps available at this moment.");
    } catch (e) {
      console.error("Error fetching actionable steps:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(prevError =>
        prevError
          ? `${prevError} Also failed to generate actionable steps: ${errorMessage}`
          : `Failed to generate actionable steps: ${errorMessage}`
      );
      setActionableSteps("Could not load actionable steps due to an error.");
    } finally {
      setIsLoadingSteps(false);
    }
  };

  // Initial welcome message or prompt to select an SDG
  const InitialMessage = () => (
    <Card className="mt-10 text-center shadow-lg animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-center gap-2 mb-2 text-primary">
          <Info className="w-8 h-8" />
          <CardTitle className="text-2xl">Welcome to Goal Explorer!</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          Please select a Sustainable Development Goal (SDG) from the options above to learn more.
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          Discover its importance and find actionable steps you can take to make a difference.
        </p>
      </CardContent>
    </Card>
  );

  if (isInitialRender) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-primary tracking-tight">Goal Explorer</h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Discover the UN's Sustainable Development Goals. Learn about their importance and find out how you can contribute to a better future for all.
        </p>
        {/* Render a simplified SDG selector or loading state for initial render */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
          {allSdgs.map(sdg => (
            <div key={sdg.id} className="h-32 bg-card rounded-lg shadow-md animate-pulse"></div>
          ))}
        </div>
        <InitialMessage />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary tracking-tight">Goal Explorer</h1>
      <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Discover the UN's Sustainable Development Goals. Learn about their importance and find out how you can contribute to a better future for all.
      </p>

      {/* Suspense only if SDGSelector is async/lazy */}
      <Suspense fallback={<p>Loading SDGs...</p>}>
        <SDGSelector sdgs={allSdgs} onSelectSdg={handleSelectSdg} selectedSdgId={selectedSdg?.id} />
      </Suspense>

      {error && (
        <Alert variant="destructive" className="my-8 shadow-md">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-semibold">Oops! Something went wrong.</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedSdg ? (
        <Suspense fallback={<p>Loading details...</p>}>
          <GoalDetails
            sdg={selectedSdg}
            explanation={explanation}
            actionableSteps={actionableSteps}
            isLoadingExplanation={isLoadingExplanation}
            isLoadingSteps={isLoadingSteps}
          />
        </Suspense>
      ) : (
        !error && <InitialMessage />
      )}
    </div>
  );
}
