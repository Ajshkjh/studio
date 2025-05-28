'use server';

/**
 * @fileOverview Generates actionable steps for contributing to a selected SDG.
 *
 * - generateActionableSteps - A function that generates actionable steps based on the selected SDG.
 * - ActionableStepsInput - The input type for the generateActionableSteps function.
 * - ActionableStepsOutput - The return type for the generateActionableSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ActionableStepsInputSchema = z.object({
  sdgGoal: z
    .string()
    .describe('The selected Sustainable Development Goal (SDG).'),
});
export type ActionableStepsInput = z.infer<typeof ActionableStepsInputSchema>;

const ActionableStepsOutputSchema = z.object({
  actionableSteps: z
    .string()
    .describe('A list of actionable steps to contribute to the selected SDG.'),
});
export type ActionableStepsOutput = z.infer<typeof ActionableStepsOutputSchema>;

export async function generateActionableSteps(
  input: ActionableStepsInput
): Promise<ActionableStepsOutput> {
  return generateActionableStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'actionableStepsPrompt',
  input: {schema: ActionableStepsInputSchema},
  output: {schema: ActionableStepsOutputSchema},
  prompt: `You are an AI assistant designed to provide actionable steps for users to contribute to a selected Sustainable Development Goal (SDG).\
\
  Selected SDG Goal: {{{sdgGoal}}}\
\
  Provide a list of actionable steps that anyone can take to contribute to the selected SDG.  The list should contain at least 3 steps.\
  Format the actionable steps as a numbered list.
  Be concise and direct.
  `,
});

const generateActionableStepsFlow = ai.defineFlow(
  {
    name: 'generateActionableStepsFlow',
    inputSchema: ActionableStepsInputSchema,
    outputSchema: ActionableStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
