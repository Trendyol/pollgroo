import Link from 'next/link';
import { Button, Typography } from 'ui';

export default function HomePage() {
  const onClickHandler = () => console.log('Button clicked');

  return (
    <div>
      <h1 className="text-3xl text-red-700">Home Page</h1>
      <Button onClick={onClickHandler} />
      <nav>
        <Link href="/about">About</Link>
      </nav>
      <Typography className="text-center lg:text-left" size="xxl" element="h1" color="primary" data-testid="ali">
        <span>test</span>
      </Typography>
      <Typography className="text-center lg:text-left" size="xxs" element="p" color="primary">
        test2
      </Typography>
    </div>
  );
}
