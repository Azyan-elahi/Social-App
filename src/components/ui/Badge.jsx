export default function Badge({ variant = 'draft' }) {
  const variantClasses = {
    draft: 'bg-gray-200 text-gray-700',
    public: 'bg-green-100 text-green-700',
    private: 'bg-orange-100 text-orange-700',
  };

  const labels = {
    draft: 'Draft',
    public: 'Public',
    private: 'Private',
  };

  return (
    <span
      className={`${variantClasses[variant]} text-xs font-medium px-2.5 py-1 rounded-full`}
    >
      {labels[variant]}
    </span>
  );
}