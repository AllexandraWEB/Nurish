type Instruction = {
  number: number;
  text: string;
};

export const useRecipeInstructions = (
  instructions: Instruction[],
  onChange: (instructions: Instruction[]) => void
) => {
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = { ...newInstructions[index], text: value };
    onChange(newInstructions);
  };

  const addInstruction = () => {
    const nextNumber = instructions.length + 1;
    onChange([...instructions, { number: nextNumber, text: "" }]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      const newInstructions = instructions
        .filter((_, i) => i !== index)
        .map((inst, i) => ({ number: i + 1, text: inst.text }));
      onChange(newInstructions);
    }
  };

  return {
    handleInstructionChange,
    addInstruction,
    removeInstruction,
  };
};