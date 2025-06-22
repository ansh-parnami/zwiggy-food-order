export default function Error({children}) {
    return(
        <div className="error">
        <h1>Error!</h1>
        <p>{children}</p>
        </div>
    )
}