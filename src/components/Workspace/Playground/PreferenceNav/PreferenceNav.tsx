import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "@/components/Modals/SettingsModal";

type PreferenceNavProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
	selectedLanguage: string;
	handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings,selectedLanguage,handleLanguageChange }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);


	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full '>
		<div className='flex items-center text-xs text-label-2 dark:text-dark-label-2'>
		  <div className='relative'>
			<select
			  className='cursor-pointer rounded bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 p-1.5 pr-6 font-medium ml-1 dark:bg-dark-fill-3 dark:focus:bg-dark-layer-1'
			  value={selectedLanguage}
			  onChange={handleLanguageChange}
			>
			  <option value='javascript'>JavaScript</option>
			  <option value='java'>Java</option>
			  <option value='python'>Python</option>
			  <option value='cpp'>C++</option>
			</select>
			<div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
			</div>
		  </div>
		</div>

			<div className='flex items-center m-2'>
				<button
					className='preferenceBtn group'
					onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>Settings</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip'>Full Screen</div>
				</button>
			</div>
			{settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
		</div>
	);
};
export default PreferenceNav;
