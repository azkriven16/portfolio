export interface ContentBlock {
  type: "paragraph" | "code";
  text: string;
  lang?: string;
}

const FENCE = /```(\w*)\n([\s\S]*?)```/g;

// Splits post content into paragraphs and fenced code blocks so code blocks
// don't get mangled by paragraph-splitting or InlineMarkdown's inline-code regex.
export function parseBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  FENCE.lastIndex = 0;

  const pushParagraphs = (text: string) => {
    for (const para of text.split(/\n\n+/)) {
      if (para.trim()) blocks.push({ type: "paragraph", text: para.trim() });
    }
  };

  while ((match = FENCE.exec(content))) {
    pushParagraphs(content.slice(lastIndex, match.index));
    blocks.push({ type: "code", text: match[2].replace(/\n$/, ""), lang: match[1] || undefined });
    lastIndex = FENCE.lastIndex;
  }
  pushParagraphs(content.slice(lastIndex));

  return blocks;
}
