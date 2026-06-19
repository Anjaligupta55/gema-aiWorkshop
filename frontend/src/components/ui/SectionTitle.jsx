function SectionTitle({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-indigo-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;