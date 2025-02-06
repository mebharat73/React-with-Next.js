"use client";
export default function RootError({ error }) {
  return <div>{error.message}</div>;
}
