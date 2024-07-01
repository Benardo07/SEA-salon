"use client";
import {motion, useAnimationControls, useInView} from 'framer-motion'
import {useEffect, useRef} from 'react'
const RevealDesc = ({
	children,
	custom,
}: {
	children: JSX.Element
	custom: number
}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, {once: false})
	const mainControls = useAnimationControls()

	useEffect(() => {
		if (isInView) {
			mainControls.start((i) => ({
				opacity: 1,
				x: 0,
				transition: {delay: i * 0.1},
			}))
		} else {
			mainControls.start({opacity: 0, x: -20})
		}
	}, [mainControls, isInView])
	return (
		<motion.div
			custom={custom}
			ref={ref}
			initial={{opacity: 0, x: -20}}
			animate={mainControls}
		>
			{children}
		</motion.div>
	)
};

export default RevealDesc;