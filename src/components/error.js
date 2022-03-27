const Error =({error})=>{
    if(!error){
        return null
    }
    return <span className="text-red-500">{`*${error}`}</span>
}

export default Error