"use client"

import Lookup from '@/app/_data/Lookup'
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Colors from '@/app/_data/Colors'

const LogoPalette = ({onHandleInputChange}) => {

    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className='my-10'>
            <HeadingDescription title={Lookup.LogoColorPaletteTitle} description={Lookup.LogoColorPaletteDesc}/>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                {Colors.map((palette, index)=>(
                    <div className={`flex p-1 cursor-pointer ${selectedOption==palette.name && 'border-2 rounded-lg border-primary'}`} key={index}>
                        {palette?.colors.map((color, index)=>(
                            <div className='h-24 w-full'
                                key={index}
                                style={{backgroundColor: color}}
                                onClick={()=> {
                                    setSelectedOption(palette.name);
                                    onHandleInputChange(palette.name);
                                }}
                            >
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default LogoPalette

