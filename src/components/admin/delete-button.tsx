"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ action, confirmText = "Xóa mục này?" }: { action: () => Promise<void>; confirmText?: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-neutral-400 transition-colors hover:text-accent-red"
        title="Xóa"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}