import { useState, useEffect, useRef } from "react"

export const useFetch = ( url ) => {
    
    const isMounted = useRef( true )
    const [state, setState] = useState({ data: null, loading: true, error: null})

    useEffect(() => {
        
        return () => {
            isMounted.current = false
        }
    }, [])


    useEffect(() => {
        setState({
            error: null,
            data: null,
            loading: true
        })
        fetch( url )
            .then( resp => resp.json())
            .then( data => {
                if( isMounted.current ){
                    setState({
                        error: null,
                        loading: false,
                        data
                    })
                }
            })
            .catch( () => {
                setState({
                    error: 'No se pudo cargar la info',
                    loading: false,
                    data: null
                })
            })
    }, [ url ])

    return state

}
