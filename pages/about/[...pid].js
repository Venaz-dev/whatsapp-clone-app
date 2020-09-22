import React from 'react'
import { useRouter } from 'next/router'

const About = () => {
    const router = useRouter()
    const { pid } = router.query
    

    console.log("pid:", pid)
    

    return (
        <div>
            <h1>
                these are the queries:{pid}<br/>
                
                

            </h1>
            
        </div>
    )
}

export default About
