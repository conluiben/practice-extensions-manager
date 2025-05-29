import useTheme from '../utils/useThemeHelper'

export default function FilterButton({text, isActive, className, onClick}){
    const {isLightTheme} = useTheme() // mind the brackets, exporting {isLightTheme,toggleTheme} but only need isLightTheme!

    return (
        <button className={`px-3.5 py-1.5 rounded-2xl duration-200 hover:cursor-pointer ${isActive ? "bg-red-500 text-neutral-0" : `hover:opacity-50 ${isLightTheme ? "bg-neutral-0 text-neutral-800" : "bg-neutral-800 text-neutral-300"} `} ${className}`} onClick={onClick}>{text}</button>
    )
}