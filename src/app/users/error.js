"use client";

export default function UsersError({ error, reset }) {
  return (
    <div>
      {error.message}

      <button
        className="mx-3 border text-black bg-white rounded px-2"
        onClick={reset}
      >
        Refresh
      </button>
    </div>
  );
}
