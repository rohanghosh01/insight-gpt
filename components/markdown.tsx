import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  // State for managing the copy success message
  const [copySuccess, setCopySuccess] = useState("");
  const { toast } = useToast();
  const { theme } = useTheme();
  // Function to handle the copy action
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess("Copied!");
      toast({
        description: "Copied to clipboard",
      });
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    });
  };

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        code({
          className,
          children,
          ...props
        }: React.ComponentProps<"code"> & { className?: string }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeContent = String(children).replace(/\n$/, ""); // Remove trailing newline

          return match ? (
            <div className="relative mb-1 rounded-lg overflow-hidden bg-transparent">
              {/* Code Block Header */}
              <div className="mt-0 relative top-3 flex justify-between items-center w-full p-0 bg-accent text-xs font-bold rounded-t-lg">
                <span className="px-2 py-1">{match[1].toUpperCase()}</span>
                <button
                  className="p-2 rounded flex items-center gap-2 text-muted-foreground"
                  onClick={() => handleCopy(codeContent)}
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                  copy code
                </button>
              </div>
              {/* SyntaxHighlighter Component */}
              <SyntaxHighlighter
                style={theme === "dark" ? (oneDark as any) : (oneLight as any)}
                language={match[1]}
                PreTag="div"
                {...props}
                ref={null}
              >
                {codeContent}
              </SyntaxHighlighter>
              {/* Copy Success Message */}
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
