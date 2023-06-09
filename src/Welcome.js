function Welcome(){
    return <h1>Welcome</h1>
}

export function Welcomeh2(props){
    return <h2>{props.children}</h2>
}

export function Welcomeh3(){
    return <h3>Welcome</h3>
}
export function Tombol(props){
    return <button className="btn">{props.children}</button>
}

export default Welcome;