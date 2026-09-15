"use client";

export default function DeleteArtworkButton({
  action,
  id,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("Are you sure you want to delete this artwork? This action cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="bg-red-900/20 text-red-400 border border-red-900/30 px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-red-900 hover:text-white transition-colors cursor-pointer"
      >
        Delete
      </button>
    </form>
  );
}
