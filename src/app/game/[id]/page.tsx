import { GameForm } from '@/components/auth/gameForm';

const GameDetails = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex w-2/4  bg-secondary py-12 px-12 rounded-lg gap-7">
        <div className="flex flex-1 flex-col">
          <h1 className="text-main text-xl md:text-2xl font-semibold md:w-80">Isi Game yang kalian mainkan &#128075;</h1>
          <GameForm />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
