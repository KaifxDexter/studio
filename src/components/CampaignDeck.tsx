
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Campaign } from '@/lib/types';
import { CampaignCard } from '@/components/CampaignCard';
import { Button } from '@/components/ui/button';

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    rotateY: direction > 0 ? -180 : 180,
    scale: 0.9,
    zIndex: 0,
  }),
  center: (index: number) => ({
    x: 0,
    opacity: 1,
    scale: 1 - Math.min(index * 0.05, 0.2),
    y: index * 30,
    rotateY: 0,
    zIndex: 10 - index,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  }),
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    rotateY: direction < 0 ? 180 : -180,
    scale: 0.9,
    zIndex: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  }),
};


export function CampaignDeck({ campaigns }: { campaigns: Campaign[] }) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = campaigns.length -1; // Loop to the end
    } else if (newPage >= campaigns.length) {
      newPage = 0; // Loop to the start
    }
    setPage([newPage, newDirection]);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 300) {
      paginate(offset.x < 0 ? 1 : -1);
    }
  };
  
  // We only want to render a few cards at a time for performance
  const cardsToRender = [];
  for (let i = 0; i < 3; i++) {
    let index = (page + i) % campaigns.length;
     if (campaigns[index]) {
       cardsToRender.push({
         campaign: campaigns[index],
         displayIndex: i
       });
     }
  }


  return (
    <div className="relative w-full max-w-lg mx-auto h-[600px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
            {cardsToRender.reverse().map(({ campaign, displayIndex }) => (
                <motion.div
                key={campaign.id}
                className="absolute w-full max-w-sm h-[520px]"
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                }}
                // @ts-ignore
                custom={displayIndex}
              >
                  <CampaignCard campaign={campaign} />
                </motion.div>
            ))}
        </AnimatePresence>
        
      <Button
        variant="outline"
        size="icon"
        className="absolute z-20 left-0 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-black/30 backdrop-blur-md"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute z-20 right-0 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-black/30 backdrop-blur-md"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}

