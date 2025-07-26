// pages/index.js
import Link from 'next/link';



export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📘 Welcome to Book Manager</h1>
      <p>
        <Link href="/books">Go to Books Page</Link>
      </p>
    </div>
  );
}
