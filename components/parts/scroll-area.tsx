import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";


const ScrollAreaDemo = ({list, header, handler}) => (
	<ScrollArea.Root className="h-[225px] w-[200px] overflow-hidden rounded bg-white shadow-[0_2px_10px] shadow-blackA4">
		<ScrollArea.Viewport className="size-full rounded">
			<div className="px-5 py-[15px]">
				<div className="text-[15px] font-medium leading-[18px] text-violet11">
					{header}
				</div>
				{list.map((item) => (
					<div
						className="mt-2.5 border-t border-t-mauve6 pt-2.5 text-[13px] leading-[18px] text-mauve12  cursor-pointer"
						key={item}
                        onClick={() =>{ 
                            console.log('handelr', handler)
                            console.log('item', item)

                            handler(item)
                        }}
					>
						{item}
					</div>
				))}
			</div>
		</ScrollArea.Viewport>
		<ScrollArea.Scrollbar
			className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
			orientation="vertical"
		>
			<ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Scrollbar
			className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
			orientation="horizontal"
		>
			<ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Corner className="bg-blackA5" />
	</ScrollArea.Root>
);

export default ScrollAreaDemo;
