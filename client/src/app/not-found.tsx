import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 — Страница не найдена</h1>
      <p>Извините, такой страницы не существует.</p>
      <Link href="/" style={{ color: 'var(--accent)' }}>
        Вернуться на главную
      </Link>
    </div>
  );
}