import { Button } from '@/components/ui/button';
import SaveHeart from '@/public/svg/home/save-heart.svg';
import ItemSkeleton from '@/skeleton/item-skeleton';
import Image from 'next/image';

type ItemProps = {
    item?: {
        id: string;
        store: string;
        name: string;
        price: string;
        imageUrl: string;
    };
}

export default function Item({ item }: ItemProps) {

    if (!item) {
        // Skeleton Code
        return (
          <ItemSkeleton/>
        );
      }

    return (
        <div>
            
        </div>
    );
}
