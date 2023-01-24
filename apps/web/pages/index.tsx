import Link from 'next/link';
import { Button } from 'ui';

export default function HomePage() {
  const onClickHandler = () => console.log('Button clicked');

  return (
    <div>
      <h1 className="text-3xl text-red-700">Home Page</h1>
      <Button onClick={onClickHandler} />
      <nav>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
