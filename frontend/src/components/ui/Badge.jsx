function Badge({ children }) {
  return (
    <span
      className="
      inline-flex
      items-center
      rounded-full
      border
      border-indigo-100
      bg-indigo-50
      px-4
      py-2
      text-sm
      font-medium
      text-indigo-700
      "
    >
      {children}
    </span>
  );
}

export default Badge;