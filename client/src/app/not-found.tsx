import Link from 'next/link';
import prepareErrorMessage from "@/helpers/prepare-error-message";

export default function NotFound({ message }: { message?: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 — Страница не найдена</h1>
      <p>{ message ? prepareErrorMessage(message) : 'Извините, такой страницы не существует' }</p>
      <Link href="/" style={{ color: 'var(--accent)' }}>
        Вернуться на главную
      </Link>
    </div>
  );
}