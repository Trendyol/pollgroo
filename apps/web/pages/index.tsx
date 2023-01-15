import Link from 'next/link';
import { Button } from 'ui';

export default function HomePage() {
  const onClickHandler = () => console.log('Button clicked');

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={onClickHandler} />
      <nav>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
