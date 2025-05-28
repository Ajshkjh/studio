'use server';
/**
 * @fileOverview Explains the meaning and importance of a selected SDG.
 *
 * - explainGoal - A function that handles the explanation of the selected SDG.
 * - ExplainGoalInput - The input type for the explainGoal function.
 * - ExplainGoalOutput - The return type for the explainGoal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainGoalInputSchema = z.object({
  sdg: z.string().describe('The selected sustainable development goal.'),
});
export type ExplainGoalInput = z.infer<typeof ExplainGoalInputSchema>;

const ExplainGoalOutputSchema = z.object({
  explanation: z.string().describe('A concise explanation of the selected SDG and its importance.'),
});
export type ExplainGoalOutput = z.infer<typeof ExplainGoalOutputSchema>;

export async function explainGoal(input: ExplainGoalInput): Promise<ExplainGoalOutput> {
  return explainGoalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainGoalPrompt',
  input: {schema: ExplainGoalInputSchema},
  output: {schema: ExplainGoalOutputSchema},
  prompt: `You are an AI assistant specialized in explaining the United Nations Sustainable Development Goals (SDGs).

  The user has selected the following SDG: {{{sdg}}}.

  Provide a concise explanation of the goal and its importance. Keep the explanation short and easy to understand.
  `,
});

const explainGoalFlow = ai.defineFlow(
  {
    name: 'explainGoalFlow',
    inputSchema: ExplainGoalInputSchema,
    outputSchema: ExplainGoalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
