"use client";

// Imports
import {FC, useRef} from "react";
import {IAnimation} from "@/types/animations";
import {motion, useInView} from "framer-motion";

export type IContentMaskAnimation = {
	children: React.ReactNode;
};

export const TextSlicedSlantMaskAnimation: IAnimation.ITextSlicedSlantMaskAnimation =
	{
		initial: {
			y: "100%",
			rotate: "3.5deg", // Start with a 40-degree slant
		},
		enter: (i: number) => ({
			y: "0", // Move into view
			rotate: "0deg", // Finish rotation to a straight line
			transition: {
				duration: 1,
				ease: [0.5, 0.5, 0.75, 1],
				delay: 0.05 * i,
			},
		}),
	};
const ContentMaskAnimation: FC<IContentMaskAnimation> = ({children}) => {
	const body = useRef(null);
	const isInView = useInView(body, {once: false, margin: "-5%"});

	return (
		<>
			<div ref={body} className="overflow-hidden">
				<div className="overflow-hidden">
					<motion.div
						initial="initial"
						animate={isInView ? "enter" : ""}
						variants={TextSlicedSlantMaskAnimation}
					>
						{children}
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default ContentMaskAnimation;