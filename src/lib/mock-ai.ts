const responses = [
  "That's an interesting question! Let me think about it...\n\nBased on my analysis, here are a few key points:\n\n1. **Context matters** — The answer depends heavily on the specific situation\n2. **Multiple perspectives** — There are several valid ways to approach this\n3. **Best practices** — Following established patterns usually yields the best results\n\nWould you like me to dive deeper into any of these points?",
  "Great question! Here's what I can tell you:\n\n```python\ndef solve(problem):\n    # Break it down into steps\n    steps = analyze(problem)\n    for step in steps:\n        execute(step)\n    return result\n```\n\nThe key insight is to **decompose complex problems** into manageable pieces. This approach works well across many domains.",
  "I'd be happy to help with that! Here's my take:\n\n> \"The best way to predict the future is to invent it.\" — Alan Kay\n\nThere are several approaches you could consider:\n\n- **Option A**: Start with the fundamentals and build up\n- **Option B**: Take a top-down approach and refine\n- **Option C**: Use an iterative method combining both\n\nEach has its merits depending on your timeline and resources.",
  "Absolutely! Let me break this down for you.\n\n### Overview\nThis is a common challenge that many developers face. The solution involves understanding the underlying architecture.\n\n### Solution\nThe most effective approach is to:\n1. First, identify the core requirements\n2. Then, design a flexible architecture\n3. Finally, implement with testing in mind\n\n### Example\n```javascript\nconst solution = {\n  scalable: true,\n  maintainable: true,\n  performant: true\n};\n```\n\nLet me know if you need more details!",
  "Here's a comprehensive answer:\n\n**Short answer**: Yes, it's definitely possible.\n\n**Long answer**: The implementation requires careful consideration of several factors:\n\n| Factor | Impact | Priority |\n|--------|--------|----------|\n| Performance | High | Critical |\n| Security | High | Critical |\n| UX | Medium | Important |\n| Cost | Low | Nice to have |\n\nI recommend starting with the critical items and iterating from there. Want me to elaborate on any specific area?",
];

export async function streamMockResponse(
  onChunk: (text: string) => void,
  onDone: () => void
) {
  const response = responses[Math.floor(Math.random() * responses.length)];
  let current = '';

  for (let i = 0; i < response.length; i++) {
    current += response[i];
    onChunk(current);
    // Variable speed for realism
    const delay = response[i] === '\n' ? 60 : response[i] === ' ' ? 25 : 15;
    await new Promise((r) => setTimeout(r, delay));
  }

  onDone();
}
