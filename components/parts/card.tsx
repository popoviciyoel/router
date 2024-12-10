import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

const HoverCardDemo = ({header, content}: any) => (
	<HoverCard.Root >
		<HoverCard.Trigger asChild style={{ padding: "10px",
        margin: "5px 0",
        background: "#ffe",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
        display: 'flex',
        alignItems: 'center',
        maxWidth: '5em',
        minHeight: '5em'}}>
			<div
				className="inline-block cursor-pointer  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white] flex items-center"
				// href="https://twitter.com/radix_ui"
				// target="_blank"
				rel="noreferrer noopener"
			>
				{/* <img
					className="block size-[45px] rounded-full"
					src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
					alt="Radix UI"
				/> */}
				<p >
                {header}
				</p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
			</div>
		</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content
				className="w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
				sideOffset={5}
			>
				{/* <div className="flex flex-col gap-[7px]">
					<img
						className="block size-[60px] rounded-full"
						src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
						alt="Radix UI"
					/>
					<div className="flex flex-col gap-[15px]">
						<div>
							<div className="m-0 text-[15px] font-medium text-mauve12">
								Radix
							</div>
							<div className="m-0 text-[15px] text-mauve10">@radix_ui</div>
						</div>
						<div className="m-0 text-[15px] text-mauve12">
							Components, icons, colors, and templates for building
							high-quality, accessible UI. Free and open-source.
						</div>
						<div className="flex gap-[15px]">
							<div className="flex gap-[5px]">
								<div className="m-0 text-[15px] font-medium text-mauve12">
									0
								</div>{" "}
								<div className="m-0 text-[15px] text-mauve10">Following</div>
							</div>
							<div className="flex gap-[5px]">
								<div className="m-0 text-[15px] font-medium text-mauve12">
									2,900
								</div>{" "}
								<div className="m-0 text-[15px] text-mauve10">Followers</div>
							</div>
						</div>
					</div>
				</div>

				<HoverCard.Arrow className="fill-white" /> */}
                {content.map((item) => {
                    return item
                })}
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
);

export default HoverCardDemo;
