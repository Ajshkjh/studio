"use client";

import { useState, useEffect, Suspense } from 'react';
import type { SDG } from '@/lib/sdgs';
import { sdgs as allSdgs } from '@/lib/sdgs';
import { explainGoal } from '@/ai/flows/explain-goal';
import { generateActionableSteps } from '@/ai/flows/actionable-steps';

import SDGSelector from '@/components/sdg/SDGSelector';
import GoalDetails from '@/components/sdg/GoalDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react'; // Using AlertTriangle for error

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
    // Scroll to top for better UX on mobile when a new SDG is selected
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
      setError(prevError => prevError ? `${prevError} Also failed to generate actionable steps: ${errorMessage}` : `Failed to generate actionable steps: ${errorMessage}`);
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
        {/* Render a simplified SDG selector or loading state for initial render to avoid hydration mismatch */}
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
         !error && <InitialMessage /> // Show initial message if no SDG selected and no error
      )}
    </div>
  );
}

// Add simple Card components if not already part of shadcn/ui imports (they are, so this is conceptual)
const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground", className)} {...props}>
    {children}
  </div>
);
Card.displayName = "Card";

const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h3>
);
CardTitle.displayName = "CardTitle";

const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);
CardContent.displayName = "CardContent";

// Utility for cn if not globally available (it is, via @/lib/utils)
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
function cn(...inputs: import('clsx').ClassValue[]) {
  return import('tailwind-merge').then(m => m.twMerge(import('clsx').then(c => c.clsx(inputs))));
}

// Add a simple fadeIn animation to globals.css or tailwind.config.js if you want it.
// For example in globals.css:
// @layer utilities {
//   .animate-fadeIn {
//     animation: fadeIn 0.5s ease-in-out;
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
// }
// And ensure your tailwind.config.ts includes this animation:
// theme: { extend: { animation: { fadeIn: 'fadeIn 0.5s ease-in-out' }, keyframes: { fadeIn: { ... } } } }

// For the purpose of this response, I will assume `animate-fadeIn` class is defined elsewhere or not strictly needed.
// I've added it conceptually in GoalDetails.tsx and InitialMessage.

