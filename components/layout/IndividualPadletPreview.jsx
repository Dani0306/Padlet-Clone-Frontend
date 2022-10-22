import singletonRouter from "next/router";

const IndividualPadletPreview = ({ padlet }) => {

    const handleRedirect = () => {
        singletonRouter.push("/padlet/" + padlet.code);
    }

  return (
    <div onClick={handleRedirect} className='hover:scale-105 transition-all duration-700 w-[300px] md:w-[400px] min-h-[200px] md:min-h-[300px] h-max rounded-xl bg-lime-600 flex flex-col items-center'>
        <div className='w-full min-h-[50px] text-white bg-black flex items-center justify-center text-2xl rounded-t-xl'>
            {padlet.name}
        </div>
    </div>
  )
}

export default IndividualPadletPreview