interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <details
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden group"
        >
          <summary className="bg-gray-50 px-4 py-3 cursor-pointer font-bold flex justify-between items-center list-none">
            <span>{item.question}</span>
            <span className="text-sm transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div className="px-4 py-4 bg-white border-t border-gray-200">
            <p className="m-0">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
