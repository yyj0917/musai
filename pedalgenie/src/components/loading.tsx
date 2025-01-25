import { Spinner } from 'basic-loading';

export default function Loading() {
  const option = {
    barColor: '#F1404C',
    bgColor: '#8E8E8E',
    size: 50,
    speed: 0.5,
    thickness: 3,
  };

  return (
    <div className="mx-auto min-w-[360px] max-w-[415px] lg:max-w-[375px] fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <Spinner option={option} />
    </div>
  );
}
