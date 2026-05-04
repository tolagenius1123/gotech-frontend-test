import Image from 'next/image';
import GoTechIcon from '@/assets/icons/GoTechIcon';
import LoginForm from './_component/LoginForm';
import { authBg } from '@/assets';

const Login = () => {
	return (
		<div className="flex min-h-screen">
			<div className="relative hidden lg:block lg:w-1/2">
				<Image
					src={authBg}
					alt="Technology background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
				<div className="absolute inset-0 flex flex-col justify-between p-10">
					<div className="flex items-center gap-2">
						<GoTechIcon className="h-10 w-10" />
						<span className="text-xl font-bold text-white">GoTech</span>
					</div>
					<div>
						<h2 className="text-4xl font-bold leading-tight text-white">
							Welcome back.
						</h2>
						<p className="mt-3 max-w-sm text-base text-white/70">
							Sign in to access your dashboard and continue where you left off.
						</p>
					</div>
				</div>
			</div>

			<div className="flex w-full flex-col justify-center bg-[#FBFBFD] px-8 py-12 sm:px-12 lg:w-1/2 lg:px-14 xl:px-20">
				<div className="flex items-center gap-3 lg:hidden mb-10">
					<GoTechIcon className="h-12 w-12" />
					<h1 className="text-2xl font-bold text-gotech-primary">GoTech</h1>
				</div>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
