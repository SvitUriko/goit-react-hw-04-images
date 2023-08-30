import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) =>{
    return  <header className={css.searchbar}>
                 <form className={css.form} 
                    onSubmit={evt => {
                        evt.preventDefault();
                        onSubmit(evt.target.elements.query.value);
                        evt.target.reset();
                    }}>
                    <button className={css.button} type="submit">
                        <span className={css.button_label}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        placeholder="Search images and photos"
                    />        
                </form>
            </header>
}