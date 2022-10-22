import MainSectionPadlets from "./MainSectionPadlets"

const MainSectionDesign = () => {
  return (
    <>
        <h1 className="text-5xl lg:text-7xl font-bold text-center text-white title mb-6 py-10">Padlet</h1> 
        <div className="wrapper w-full flex items-center justify-center">
          <h1 className="static-text">In here you can: </h1>
          <ul className="dynamic-texts">
            <li><span>Create</span></li>
            <li><span>Imagine</span></li>
            <li><span>Design</span></li>
            <li><span>Share</span></li>
          </ul>
        </div>
        <MainSectionPadlets />
    </>
  )
}

export default MainSectionDesign