import React from 'react';
import { BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

interface FormattedAiMessageProps {
  content: string;
}

export const FormattedAiMessage: React.FC<FormattedAiMessageProps> = ({ content }) => {
  // Process inline styles: bold (**text**), italic (*text* or _text_), code (`code`), arrows
  const renderInlineFormatted = (text: string): React.ReactNode => {
    // Replace arrow notations
    const cleanText = text.replace(/\$\\rightarrow\$/g, '→').replace(/->/g, '→');

    // Tokenize for bold-italic, bold, italic, code
    const parts = cleanText.split(/(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
        return (
          <strong key={idx} className="font-extrabold italic text-teal-900 dark:text-teal-200">
            {part.slice(3, -3)}
          </strong>
        );
      }
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return (
          <em key={idx} className="italic font-medium text-teal-800 dark:text-teal-300">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={idx} className="px-1.5 py-0.5 text-[11px] font-mono bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 rounded">
            {part.slice(1, -1)}
          </code>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  // Split lines and group into structured blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      elements.push(<div key={`sp-${index}`} className="h-1.5" />);
      return;
    }

    // Horizontal Rule (---)
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushList();
      elements.push(
        <hr
          key={`hr-${index}`}
          className="my-3 border-t border-slate-200 dark:border-slate-700/80"
        />
      );
      return;
    }

    // Heading (### or ## or #)
    if (trimmed.startsWith('#')) {
      flushList();
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      const title = trimmed.replace(/^#+\s*/, '');

      if (level <= 2) {
        elements.push(
          <h3
            key={`h-${index}`}
            className="text-sm sm:text-base font-extrabold text-teal-900 dark:text-teal-200 mt-3.5 mb-1.5 pb-1 border-b border-teal-100 dark:border-teal-900/50 flex items-center space-x-1.5"
          >
            <span>{renderInlineFormatted(title)}</span>
          </h3>
        );
      } else {
        elements.push(
          <h4
            key={`h-${index}`}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-2.5 mb-1 flex items-center space-x-1"
          >
            <span>{renderInlineFormatted(title)}</span>
          </h4>
        );
      }
      return;
    }

    // Reference Callout Box (📚 Rujukan: ...)
    if (trimmed.includes('📚') || trimmed.toLowerCase().startsWith('rujukan:')) {
      flushList();
      elements.push(
        <div
          key={`ref-${index}`}
          className="mt-3 p-2.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-[11px] sm:text-xs text-teal-900 dark:text-teal-200 font-medium flex items-start space-x-2"
        >
          <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{renderInlineFormatted(trimmed)}</div>
        </div>
      );
      return;
    }

    // Numbered List (1. , 2. , dsb.)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      flushList();
      const num = numMatch[1];
      const itemText = numMatch[2];
      elements.push(
        <div key={`num-${index}`} className="flex items-start space-x-2 my-1.5">
          <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-teal-300 dark:border-teal-700">
            {num}
          </span>
          <div className="flex-1 text-slate-800 dark:text-slate-200 leading-relaxed text-xs sm:text-sm">
            {renderInlineFormatted(itemText)}
          </div>
        </div>
      );
      return;
    }

    // Bullet List (* , - , • )
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)/);
    if (bulletMatch) {
      inList = true;
      const bulletText = bulletMatch[1];
      listItems.push(
        <li key={`li-${index}`} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400 shrink-0 mt-2" />
          <div className="flex-1 leading-relaxed">{renderInlineFormatted(bulletText)}</div>
        </li>
      );
      return;
    }

    // Normal paragraph
    flushList();
    elements.push(
      <p key={`p-${index}`} className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed my-1">
        {renderInlineFormatted(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-0.5">{elements}</div>;
};
