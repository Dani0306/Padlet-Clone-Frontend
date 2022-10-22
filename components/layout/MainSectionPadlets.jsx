import React from 'react'
import Image from 'next/image'

const MainSectionPadlets = () => {
  return (
    <div className='w-max h-max relative mx-auto mt-[50px]'>
        <div className='mt-[30px] w-full md:w-[600px] h-[450px] max-h-[600px] flex items-center justify-center mx-auto'>
            <div className='w-full z-10 max-w-[250px] h-full flex flex-col bg-white rounded-3xl relative'>
                <div className='w-full h-[25%] flex items-center justify-center py-2'>
                    <h2 className='text-center text-2xl font-semibold'>Share yout better experiences and thoughts</h2>
                </div>
                <div className='w-[90%] mx-auto h-[40%] flex items-center justify-center relative'>
                    <Image src='/experience1.jpeg' objectFit='cover' layout="fill" />
                </div>
                <div className='w-full h-[35%] break-words pt-4 px-4'>
                    <p className='max-w-full text-justify'>
                    If the difficulty of someones situation has you feeling stumped about what to say, keep reading.
                    </p>
                </div>
            </div>

            {/*  SEGUNDA  */}

            <div className='flex w-full max-w-[250px] h-full flex-col bg-white rounded-3xl absolute right-[-30px] lg:right-0 rotate-[-10deg] lg:rotate-[-20deg]'>
                <div className='w-full h-[20%] flex items-center justify-center'>
                    <h2 className='text-center text-2xl font-semibold'>With us</h2>
                </div>
                <div className='w-[90%] mx-auto h-[40%] flex items-center justify-center relative'>
                    <Image src='/experience2.jpeg' objectFit='cover' layout='fill'/>
                </div>
                <div className='w-full h-[40%] break-words px-4 py-2'>
                    <p className='max-w-full text-justify'>
                        If the difficulty of someones situation has you feeling stumped about what to say, keep reading.
                    </p>
                </div>
            </div>

            {/*  TERCERA  */}

            <div className='flex w-full max-w-[250px] h-full flex-col bg-white rounded-3xl absolute left-[-30px] lg:left-0 rotate-[10deg] lg:rotate-[20deg]'>
                <div className='w-full h-[20%] flex items-center justify-center'>
                    <h2 className='text-center text-2xl font-semibold'>Create</h2>
                </div>
                <div className='w-[90%] mx-auto h-[40%] flex items-center justify-center relative'>
                    <Image src='/experience3.jpeg' objectFit='cover' layout='fill' />
                </div>
                <div className='w-full h-[40%] break-words px-4 py-2'>
                    <p className='max-w-full text-justify'>
                        If the difficulty of someones situation has you feeling stumped about what to say, keep reading.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainSectionPadlets