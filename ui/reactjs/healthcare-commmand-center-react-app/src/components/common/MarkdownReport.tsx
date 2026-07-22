import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownReportProps {
  content: string;
}

const MarkdownReport = ({
  content,
}: MarkdownReportProps) => {
  return (
    <div className="markdown-report">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownReport;