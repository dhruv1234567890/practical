export default function Pagination({
  current = 1,
  perPage = 10,
  total = 0,
  onChange = () => {},
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages === 1) return null;

  if (pages <= 7) {
    const arr = Array.from({ length: pages }, (_, i) => i + 1);
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {arr.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 border rounded ${
              p === current ? "bg-gray-800 text-white" : ""
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onChange(Math.min(pages, current + 1))}
          disabled={current === pages}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }

  const pageSet = new Set();

  pageSet.add(1);
  pageSet.add(pages);

  for (let p = current - 1; p <= current + 1; p++) {
    if (p > 1 && p < pages) pageSet.add(p);
  }

  if (current <= 4) {
    pageSet.add(2);
    pageSet.add(3);
    pageSet.add(4);
  }

  if (current >= pages - 3) {
    pageSet.add(pages - 1);
    pageSet.add(pages - 2);
    pageSet.add(pages - 3);
  }

  const pageList = Array.from(pageSet).sort((a, b) => a - b);

  const renderList = [];
  for (let i = 0; i < pageList.length; i++) {
    const cur = pageList[i];
    const prev = pageList[i - 1];
    if (i > 0 && cur - prev > 1) {
      renderList.push("ellipsis-" + i);
    }
    renderList.push(cur);
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {renderList.map((x, idx) => {
        if (typeof x === "string" && x.startsWith("ellipsis-")) {
          return (
            <span key={x + "-" + idx} className="px-3 py-1 text-gray-500">
              …
            </span>
          );
        }
        return (
          <button
            key={x}
            onClick={() => onChange(x)}
            className={`px-3 py-1 border rounded ${
              x === current ? "bg-gray-800 text-white" : ""
            }`}
          >
            {x}
          </button>
        );
      })}

      <button
        onClick={() => onChange(Math.min(pages, current + 1))}
        disabled={current === pages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
