'use client';

import Button from "@/components/button";

interface ErrorProps {
  error: Error;
  reset?: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>500 — Ошибка сервера</h1>
      <p>{error.message || 'Что-то пошло не так.'}</p>
      {reset ?
      <Button
        onClick={reset}
      >
        Попробовать снова
      </Button>
      : null}
    </div>
  );
}