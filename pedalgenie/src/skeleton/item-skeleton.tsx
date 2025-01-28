import { Button } from '@/components/ui/button';
import SaveHeart from '@public/svg/home/save-heart.svg';

export default function ItemSkeleton() {
  return (
    <div className="relative min-w-[138px] h-[252px] flex flex-col gap-3">
      <div className="relative w-full min-h-[138px] bg-grey750 rounded-sm">
        <span className="absolute text-grey550 ">
          <SaveHeart />
        </span>
      </div>
      <div className="w-[100px] h-[21px] bg-grey50 rounded"></div>
      <div className="w-full h-[18px] bg-grey550 rounded"></div>
      <div className="w-[80px] h-[21px] bg-grey50 rounded"></div>
      <div className="flex gap-1">
        <Button variant="chip" className="w-[37px] h-[30px]"></Button>
        <Button variant="chip" className="w-[37px] h-[30px]"></Button>
        <Button variant="chip" className="w-[37px] h-[30px]"></Button>
      </div>
    </div>
  );
}
