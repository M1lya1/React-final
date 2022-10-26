import Input from "antd/lib/input/Input";
import Button from "antd/lib/button";
import { useState } from "react";
import { history } from "../App";


const SearchElement = () => {
	
    const [search, setSearch] = useState("");
	const tryToSearch = () => {
		const noSpace = search.replaceAll(" ", "");
		if (!search || noSpace === "") {
			setSearch("");
			return history.push("/main");
			
		}

		history.push(`/search/${search}`);
		
		setSearch("");
	}

    return (
        <form className="header__search">
            <Input type='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
            <Button className="search__btn" onClick={() => tryToSearch()}>Search</Button>
        </form>
    )
}

export default SearchElement
