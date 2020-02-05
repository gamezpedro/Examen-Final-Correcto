function NewMovie( props ){
    function click(event){
        event.preventDefault();
        let newMovie = {
            title : event.target.newTitle.value,
            year : event.target.newYear.value,
            rating : event.target.newRating.value,
        }
        //agregando la película
        props.addMovie( newMovie );
    }
    return (
        //form entrada de inputs para agregar nueva película
        <form onSubmit={(event)=> click(event)} id="Form">
            <label htmlFor="new"> New Movie: </label>
            <input name="newTitle" type="text" id="newMovie"/>
            <input name="newYear" type="text" id="newMovie"/>
            <input name="newRating" type="text" id="newMovie"/>
            <button type="submit">
                Add
            </button>
        </form>
    )

}
export default NewMovie;