import CodeBlock from './CodeBlock';

const MarkdownRenderer = ({ content }) => {
  // Parse markdown content and render with proper formatting
  const parseContent = (text) => {
    const elements = [];
    let currentIndex = 0;

    // Regular expressions
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const boldRegex = /\*\*(.+?)\*\*/g;
    const listItemRegex = /^[-*]\s+(.+)$/gm;
    const checkboxRegex = /^[-*]\s+([✅❌])\s+(.+)$/gm;

    let match;
    const codeBlocks = [];

    // First, extract all code blocks
    while ((match = codeBlockRegex.exec(text)) !== null) {
      codeBlocks.push({
        start: match.index,
        end: match.index + match[0].length,
        language: match[1] || 'javascript',
        code: match[2].trim(),
      });
    }

    // Split content by code blocks
    if (codeBlocks.length === 0) {
      return renderTextContent(text);
    }

    codeBlocks.forEach((block, index) => {
      // Text before code block
      if (block.start > currentIndex) {
        const textContent = text.slice(currentIndex, block.start);
        elements.push(
          <div key={`text-${index}`}>{renderTextContent(textContent)}</div>,
        );
      }

      // Code block
      elements.push(
        <CodeBlock
          key={`code-${index}`}
          code={block.code}
          language={block.language}
          showLineNumbers={true}
        />,
      );

      currentIndex = block.end;
    });

    // Remaining text after last code block
    if (currentIndex < text.length) {
      elements.push(
        <div key="text-final">
          {renderTextContent(text.slice(currentIndex))}
        </div>,
      );
    }

    return elements;
  };

  const renderTextContent = (text) => {
    const lines = text.split('\n');
    const elements = [];

    lines.forEach((line, index) => {
      // Skip empty lines
      if (!line.trim()) {
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // Headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        const HeadingTag = `h${level}`;
        const sizeClasses = {
          1: 'text-4xl md:text-5xl font-bold mb-6 mt-8',
          2: 'text-3xl md:text-4xl font-bold mb-5 mt-7',
          3: 'text-2xl md:text-3xl font-bold mb-4 mt-6',
          4: 'text-xl md:text-2xl font-semibold mb-3 mt-5',
          5: 'text-lg md:text-xl font-semibold mb-2 mt-4',
          6: 'text-base md:text-lg font-semibold mb-2 mt-3',
        };
        elements.push(
          <HeadingTag
            key={index}
            className={`text-white ${sizeClasses[level]}`}
          >
            {renderInlineFormatting(text)}
          </HeadingTag>,
        );
        return;
      }

      // Checkbox list items
      const checkboxMatch = line.match(/^[-*]\s+([✅❌])\s+(.+)$/);
      if (checkboxMatch) {
        const emoji = checkboxMatch[1];
        const text = checkboxMatch[2];
        elements.push(
          <div key={index} className="flex items-start gap-3 mb-2 ml-4">
            <span className="text-xl mt-0.5">{emoji}</span>
            <span className="text-gray-300 leading-relaxed">
              {renderInlineFormatting(text)}
            </span>
          </div>,
        );
        return;
      }

      // Regular list items
      const listMatch = line.match(/^[-*]\s+(.+)$/);
      if (listMatch) {
        elements.push(
          <div key={index} className="flex items-start gap-3 mb-2 ml-4">
            <span className="text-blue-400 mt-1.5">•</span>
            <span className="text-gray-300 leading-relaxed flex-1">
              {renderInlineFormatting(listMatch[1])}
            </span>
          </div>,
        );
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-gray-300 leading-relaxed mb-4">
          {renderInlineFormatting(line)}
        </p>,
      );
    });

    return elements;
  };

  const renderInlineFormatting = (text) => {
    const elements = [];
    let lastIndex = 0;

    // Process inline code first
    const inlineCodeRegex = /`([^`]+)`/g;
    let match;

    const parts = [];
    while ((match = inlineCodeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        });
      }
      parts.push({ type: 'code', content: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    // Process each part for bold formatting
    parts.forEach((part, index) => {
      if (part.type === 'code') {
        elements.push(
          <code
            key={index}
            className="px-1.5 py-0.5 bg-gray-800 text-blue-400 rounded text-sm font-mono"
          >
            {part.content}
          </code>,
        );
      } else {
        const boldRegex = /\*\*(.+?)\*\*/g;
        let boldMatch;
        let boldLastIndex = 0;
        const textParts = [];

        while ((boldMatch = boldRegex.exec(part.content)) !== null) {
          if (boldMatch.index > boldLastIndex) {
            textParts.push(part.content.slice(boldLastIndex, boldMatch.index));
          }
          textParts.push(
            <strong
              key={`bold-${index}-${boldMatch.index}`}
              className="font-bold text-white"
            >
              {boldMatch[1]}
            </strong>,
          );
          boldLastIndex = boldMatch.index + boldMatch[0].length;
        }

        if (boldLastIndex < part.content.length) {
          textParts.push(part.content.slice(boldLastIndex));
        }

        elements.push(...textParts);
      }
    });

    return elements.length > 0 ? elements : text;
  };

  return <div className="markdown-content">{parseContent(content)}</div>;
};

export default MarkdownRenderer;
