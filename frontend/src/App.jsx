import { useState, useMemo } from 'react'
import './App.css'
import Headbar from './components/Headbar'
import FilterButton from './components/FilterButton'
import rawAllExtensions from './data.json'
import ExtensionCard from './components/ExtensionCard'
import useTheme from './utils/useThemeHelper'

function App() {  
  function changeFilter(newFilter){
    setListFilter(newFilter)
  }
  function toggleActiveStatus(extKey){
    setAllExtensions(prevState => (prevState.map((anExt,idx)=>{
      if(extKey===idx){
        return {...anExt,isActive: !anExt.isActive}
      }
      return anExt;
    })))
  }
  function removeExt(extName){
    setAllExtensions(prevState => (prevState.filter((anExt)=>anExt.name!==extName)))
  }

  const { isLightTheme, toggleTheme } = useTheme();
  
  const [allExtensions, setAllExtensions] = useState(rawAllExtensions)
  const [listFilter, setListFilter] = useState("All") // can be "All", "Active", "Inactive"
  
  // optimization: useMemo sample
  const filteredExtensions = useMemo(() => {
    return allExtensions.map(({logo,name,description,isActive},idx)=>{
      if (!(listFilter==="Active" && isActive) && !(listFilter==="Inactive" && !isActive) && !(listFilter==="All")) { 
        return
      }
      return (
        <ExtensionCard key={idx} logo={logo} name={name} description={description} isActive={isActive} className={"w-full"} onClickToggleActive={()=>toggleActiveStatus(idx)} onClickRemove={()=>removeExt(name)} />
    )});
  }, [allExtensions, listFilter]);

  return (
      <div className={`${isLightTheme ? "bg-[linear-gradient(180deg,#ebf2fc_0%,#eef8f9_100%)]" : "bg-[linear-gradient(180deg,#040918_0%,#091540_100%)]"} min-h-screen`}>
        <div className='max-w-9/10 sm:max-w-4/5 mx-auto p-4 sm:p-6'>
          <Headbar className="mb-8 sm:mb-12" onClick={toggleTheme}/>
          <div className='flex justify-between flex-col gap-2 items-center sm:flex-row mb-4 sm:mb-6'>
            <h2 className={`font-bold text-2xl ${isLightTheme ? "" : "text-[#fbfdfe]"}`}>Extensions List</h2>
            <div className='flex gap-2'>
              {["All","Active","Inactive"].map((elem,idx)=>(
                <FilterButton key={idx} text={elem} isActive={elem===listFilter} isFilterButton={true} onClick={()=>changeFilter(elem)} />
              ))}
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredExtensions}
          </div>
        </div>
      </div>
  )
}

export default App
