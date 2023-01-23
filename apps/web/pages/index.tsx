import Link from 'next/link';
import { Button, DummyMolecule, DummyOrganism } from 'ui';

export default function HomePage() {
  const onClickHandler = () => console.log('Button clicked');

  return (
    <div>
      <h1 className="text-3xl text-red-700">Home Page</h1>
      <div>
        <span>from atoms</span>
        <Button onClick={onClickHandler} />
      </div>
      <div>
        <span>from molecules</span>
        <DummyMolecule />
      </div>
      <div>
        <span>from organisms</span>
        <DummyOrganism />
      </div>
      <nav>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
