'use client';

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
      <button
        onClick={reset}
        style={{
          background: 'var(--button-accent)',
          color: 'var(--button-accent-text)',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Попробовать снова
      </button>
      : null}
    </div>
  );
}