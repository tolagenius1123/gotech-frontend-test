import * as React from 'react';

interface GoTechIconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export const GoTechIcon: React.FC<GoTechIconProps> = ({ className, ...props }) => {
	const uid = React.useId();
	const bgId = `gotech-bg-${uid}`;
	const accentId = `gotech-accent-${uid}`;

	return (
		<svg
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			role="img"
			aria-label="GoTech"
			{...props}
		>
			<defs>
				<linearGradient id={bgId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stopColor="#0EA5E9" />
					<stop offset="100%" stopColor="#1E40AF" />
				</linearGradient>
				<linearGradient id={accentId} x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stopColor="#FFFFFF" />
					<stop offset="100%" stopColor="#E0F2FE" />
				</linearGradient>
			</defs>

			<rect width="64" height="64" rx="14" fill={`url(#${bgId})`} />

			<g stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1" strokeLinecap="round">
				<path d="M8 20 H18 V12" />
				<path d="M56 44 H46 V52" />
				<circle cx="18" cy="12" r="1.2" fill="#FFFFFF" fillOpacity="0.4" stroke="none" />
				<circle cx="46" cy="52" r="1.2" fill="#FFFFFF" fillOpacity="0.4" stroke="none" />
			</g>

			<g>
				<path
					d="M40 20
             A14 14 0 1 0 40 44
             L32 44
             L32 34
             L42 34"
					stroke={`url(#${accentId})`}
					strokeWidth="5"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
				<path
					d="M44 26 L50 32 L44 38"
					stroke="#7DD3FC"
					strokeWidth="3.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
			</g>
		</svg>
	);
};

export default GoTechIcon;
