import { GameResultPage } from '@/../../packages/ui';

export default function AboutPage() {
  const gameResultCards = [
    { order: 1, total: 3, score: 5, text: 'result card1 text' },
    { order: 1, total: 3, score: 5, text: 'result card1 text' },
    { order: 1, total: 3, score: 5, text: 'result card1 text' },
    { order: 1, total: 3, score: 5, text: 'result card1 text' },
  ];
  return (
    <div>
      <h1>About Page</h1>
      <GameResultPage gameResultCards={gameResultCards} logoUrl="/logo/pollgroo3.svg" />
    </div>
  );
}
