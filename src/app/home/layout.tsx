import AppBar from '@/components/shared-components/AppBar';

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <AppBar />
      <div className="col-span-4">{props.children}</div>
    </div>
  );
};

export default DashBoardLayout;
