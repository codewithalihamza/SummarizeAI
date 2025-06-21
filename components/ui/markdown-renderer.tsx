import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
    return (
        <div className={`prose prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                components={{
                    // Custom styling for markdown elements
                    p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
                    ul: ({ children }) => <ul className="list-none space-y-2 mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 pl-4">{children}</ol>,
                    li: ({ children }) => <li className="flex items-start">{children}</li>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-white">{children}</h3>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[#4F6BFF] pl-4 italic text-gray-300 mb-4">
                            {children}
                        </blockquote>
                    ),
                    code: ({ children }) => (
                        <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">
                            {children}
                        </code>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
} 