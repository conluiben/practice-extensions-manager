import FilterButton from "./FilterButton"
import Switch from '@mui/material/Switch';
import useTheme from '../utils/useThemeHelper'

export default function ExtensionCard({logo,name,description,className,isActive,onClickToggleActive,onClickRemove}){
    const {isLightTheme} = useTheme()
    return (
        <div className={`p-4 rounded-xl ${className} flex flex-col justify-between ${isLightTheme ? "bg-neutral-0" : "bg-neutral-800"}`}>
            <div className={`flex mb-8 gap-4 items-start ${isLightTheme ? "text-neutral-800" : "text-neutral-300"}`}>
                <img src={`/src/${logo}`} alt={name} />
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <FilterButton text="Remove" className="border-1 border-gray-400" isFilterButton={false} onClick={onClickRemove} />
                <Switch checked={isActive} onChange={onClickToggleActive} color="warning" />
            </div>
        </div>
    )

}