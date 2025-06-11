import headerLogo from '../assets/images/logo.svg'
import sunIcon from '../assets/images/icon-sun.svg'
import moonIcon from '../assets/images/icon-moon.svg'
import useTheme from '../utils/useThemeHelper'

export default function Headbar({className,onClick}){
    const {isLightTheme} = useTheme() // need brackets, exporting {isLightTheme,toggleTheme} but only need isLightTheme!
    return (
        <div className={`flex p-4 w-full justify-between rounded-2xl ${className} ${isLightTheme ? "bg-white" : "bg-[#1F2535]"}`}>
            <img src={headerLogo} alt="Extensions Logo" className={`${!isLightTheme && "invert"}`} />
            <div className={`flex place-content-center p-2 rounded-lg ${isLightTheme ? "bg-[#EDEEEF] hover:bg-[hsl(226,11.10%,37.10%)]" : "bg-[#2F354C] hover:bg-[#52576A]"}  duration-200 hover:cursor-pointer`} onClick={onClick}>
                <img src={isLightTheme ? moonIcon : sunIcon} alt="Dark Mode Icon" />
            </div>
        </div>
    )
}